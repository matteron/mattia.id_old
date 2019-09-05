const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const md = require('markdown-it')();
const logger = require('./logger.js');
const mustache = require('mustache');
const uglifycss = require('uglifycss');
const minify = require('html-minifier').minify;

const log = new logger();

module.exports = class Compiler {
	// options = {
	// 	build: boolean,
	// 	cssName: 'ugly.css'
	// }
	constructor(options) {
		this.options = options;
		this.build = options.build;
		this.rootPrefix = './src/';
		this.dirs = {
			html: 'pages',
			css: 'css',
			js: 'js',
			fonts: 'fonts',
			temps: 'templating'
		}
		this.rootPaths = {
			html: path.join(this.rootPrefix, this.dirs.html),
			css: path.join(this.rootPrefix, this.dirs.css),
			js : path.join(this.rootPrefix, this.dirs.js),
			fonts: path.join(this.rootPrefix, this.dirs.fonts),
			temps: {
				base: path.join(this.rootPrefix, this.dirs.temps, 'base.mustache'),
				data: path.join('../src/', this.dirs.temps, 'site.json')
			}
		}
		this.outputPath = this.build ? 'dist' : 'dev/temp';
		this.uglifyOutput = options.cssName ? options.cssName : 'ugly.css';
		this.siteBase = fs.readFileSync(this.rootPaths.temps.base, 'utf-8');
		this.siteData = require(this.rootPaths.temps.data);
		this.cssLinks = [];
		this.fontLinks = [];
	}

	mkdirs() {
		if (fs.existsSync(this.outputPath)) {
			// Means we've found an existing temp directory
			log.print('outputfound', [true]);
		} else {
			fs.mkdirSync(this.outputPath);
			// Temp doesn't need folders for css or fonts as they aren't compiled
			if (this.build) {
				fs.mkdirSync(path.join(this.outputPath, this.dirs.css));
				fs.mkdirSync(path.join(this.outputPath, this.dirs.fonts));
			}
			log.print('outputfound', [false]);
		}
	}

	css() {
		var cssFiles = fs.readdirSync(this.rootPaths.css);
		this.cssLinks = [];
		if (this.build) {
			log.print('verb', ['Uglifying', 'CSS']);
			cssFiles.forEach((file, i) => {
				cssFiles[i] = path.join(this.rootPaths.css, file);
			});
			const uglified = uglifycss.processFiles(cssFiles);
			const uglyPath = path.join(this.outputPath, this.dirs.css, this.uglifyOutput)
			fs.writeFileSync(
				uglyPath,
				uglified
			);
			log.print('file', ['Output', this.uglifyOutput]);
			this.cssLinks.push('css/' + this.uglifyOutput);
			log.print('file', ['Linked', this.uglifyOutput]);
			log.print('verb', ['Uglifying', 'CSS', 'Finished']);
		} else {
			log.print('verb', ['Linking', 'CSS']);
			cssFiles.forEach((file) => {
				this.cssLinks.push(path.join(this.dirs.css, file));
				log.print('file', ['Linked', file]);
			});
			log.print('verb', ['Linking', 'CSS', 'Finished']);
		}
	}

	fonts() {
		var fontFiles = fs.readdirSync(this.rootPaths.fonts);
		this.fontLinks = [];
		if (this.build) {
			log.print('verb', ['Copying', 'Fonts']);
			fs.readdirSync(this.rootPaths.fonts).forEach((font) => {
				fs.copyFileSync(
					path.join(this.rootPaths.fonts, font),
					path.join(this.outputPath, this.dirs.fonts, font)
				);
				log.print('file', ['Copied', font]);
			});
			log.print('verb', ['Copying', 'Fonts', 'Finished']);
		}
		log.print('verb', ['Linking', 'Fonts']);
		var fontBreakdown = [];
		fontFiles.forEach((file) => {
			let type = path.extname(file);
			let baseName = path.basename(file, type);
			if(fontBreakdown.some(e => e.font === baseName)){
				let index = fontBreakdown.findIndex(e => e.font === baseName);
				fontBreakdown[index].types.push(type);
			} else {
				fontBreakdown.push({
					font: baseName,
					types: [type]
				});
			}
		});
		// Now reduce the list to only "best" extension.
		var fontLinks = [];
		const extOrder = [
			'.woff2',
			'.woff',
			'.ttf',
			'.svg',
			'.eot'
		];
		const linkPath = this.build ? this.dirs.fonts : path.join(this.dirs.fonts);
		fontBreakdown.forEach((e) => {
			// Yes I know it's gross, I just couldn't figure
			// out how to return highest order in an array.
			extOrder.some((ext) => {
				if (e.types.includes(ext)) {
					this.fontLinks.push({
						type: ext.substring(1),
						path: path.join(linkPath, e.font + ext)
					});
					log.print('file', ['Linked', e.font + ext]);
					return true;
				}
			});
		});
		log.print('verb', ['Linking', 'Fonts', 'Finished']);
	}

	html() {
		log.print('verb', ['Compiling', 'Templates']);
		this.siteData.forEach(page => this.template(page));
		log.print('verb', ['Compiling', 'Templates', 'Finished']);
	}

	template(page) {
		const typeFunctions = {
			"md": () => { return md.render(fs.readFileSync(loc, 'utf-8')); },
			"html": () => { return fs.readFileSync(loc, 'utf-8'); }
		};

		let ext = '.' + page.type;
		let loc = path.join(this.rootPaths.html, page.name + ext);
		
		page.data.body = typeFunctions[page.type]();
		page.data.css = this.cssLinks;
		page.data.fonts = this.fontLinks;

		let compiled = '';
		if(this.build){
			const minifyArgs = {
				collapseWhitespace: true,
				removeComments: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeTagWhitespace: true,
				userShortDoctype: true,
				minifyCSS: true,
				minifyJS: true
			}
			compiled = minify(mustache.render(this.siteBase, page.data), minifyArgs);
		} else {
			compiled = mustache.render(this.siteBase, page.data);
		}
		let newPath = path.join(this.outputPath, page.name + '.html')
		fs.writeFileSync(newPath, compiled);

		log.print('file', ['Compiled', page.name + ext]);
	}

	compile() {
		this.mkdirs();
		this.css();
		this.fonts();
		this.html();
	}

	clean() {
		rimraf.sync(this.outputPath);
		log.print('cleaned', [this.outputPath]);
	}
}