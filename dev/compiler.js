const fs = require('fs');
const path = require('path');
const log = require('./logger.js');
const md = require('markdown-it')({
	html: true
});
const uglifycss = require('uglifycss');
const prism = require('markdown-it-prism');
const minify = require('html-minifier').minify;

md.use(prism);

const rootDir = './src/';
const cssName = 'ugly.css';

function rootPath(dir) {
	return path.join(rootDir, dir);
}

const dirs = Object.freeze({
	pages: 'pages',
	projects: 'projects',
	css: 'media/css',
	fonts: 'media/fonts',
	template: 'template'
});

const src = Object.freeze({
	pages: rootPath(dirs.pages),
	projects: path.join(rootPath(dirs.pages), dirs.projects),
	css: rootPath(dirs.css),
	fonts: rootPath(dirs.fonts),
	template: '../' + rootPath(dirs.template)
});

let meta = require(path.join(src.template, 'meta'));
let template = require(path.join(src.template, 'template'));

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

// Type Commands
function markdown(page) {
	const folder = meta.isProject(page)
		? src.projects
		: src.pages;
	const loc = path.join(folder, page.name.toLowerCase() + '.md');
	const rawBody = fs.readFileSync(loc, 'utf-8');
	return md.render(rawBody);
}

function projectList() {
	const projects = meta.pages.filter(p => meta.isProject(p)).reverse();
	return template.projectList(projects);
}

module.exports = class Compiler {
	
	constructor(isBuild) {
		this.isBuild = isBuild;
		this.outputPath = isBuild ? 'dist' : 'dev/temp';
		this.cssLinks = [];
		this.fontLinks = [];
	}

	mkdirs() {
		if (fs.existsSync(this.outputPath)) {
			// Means we've found an existing temp directory
			log.print('outputfound', [true]);
		} else {
			fs.mkdirSync(this.outputPath);
			fs.mkdirSync(path.join(this.outputPath, dirs.projects));
			// Temp doesn't need folders for css or fonts as they aren't compiled
			fs.mkdirSync(path.join(this.outputPath, 'media'));
			if (this.isBuild) {
				fs.mkdirSync(path.join(this.outputPath, dirs.css));
				fs.mkdirSync(path.join(this.outputPath, dirs.fonts));
			}
			log.print('outputfound', [false]);
		}
	}

	css() {
		var cssFiles = fs.readdirSync(src.css);
		this.cssLinks = [];
		if (this.isBuild) {
			log.print('verb', ['Uglifying', 'CSS']);
			cssFiles.forEach((file, i) => {
				cssFiles[i] = path.join(src.css, file);
			});
			const uglified = uglifycss.processFiles(cssFiles);
			const uglyPath = path.join(this.outputPath, dirs.css, cssName)
			fs.writeFileSync(
				uglyPath,
				uglified
			);
			log.print('file', ['Output', cssName]);
			this.cssLinks.push(path.join('/', dirs.css, cssName));
			log.print('verb', ['Uglifying', 'CSS', 'Finished']);
		} else {
			log.print('verb', ['Linking', 'CSS']);
			cssFiles.forEach((file) => {
				this.cssLinks.push(path.join('/', dirs.css, file));
				log.print('file', ['Linked', file]);
			});
			log.print('verb', ['Linking', 'CSS', 'Finished']);
		}
	}

	fonts() {
		var fontFiles = fs.readdirSync(src.fonts);
		this.fontLinks = [];
		if (this.isBuild) {
			log.print('verb', ['Copying', 'Fonts']);
			fs.readdirSync(src.fonts).forEach((font) => {
				fs.copyFileSync(
					path.join(src.fonts, font),
					path.join(this.outputPath, dirs.fonts, font)
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
		const linkPath = path.join('/', dirs.fonts);
		fontBreakdown.forEach((e) => {
			// Yes I know it's gross, I just couldn't figure
			// out how to return highest order in an array.
			extOrder.some((ext) => {
				if (e.types.includes(ext)) {
					this.fontLinks.push(path.join(linkPath, e.font + ext));
					log.print('file', ['Linked', e.font + ext]);
					return true;
				}
			});
		});
		log.print('verb', ['Linking', 'Fonts', 'Finished']);
	}

	prepareTemplate(page) {

		var body = meta.isProjectList(page)
			? projectList()
			: markdown(page);
		return {
			title: meta.isHome(page) ? '' : page.name,
			desc: page.desc,
			fonts: this.fontLinks,
			css: this.cssLinks,
			accent: meta.accentColors[page.type],
			body: body
		}
	}
	
	processTemplate(params) {
		const temp = template.base(params);
		if (this.isBuild) {
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
			return minify(temp);
		}
		return temp;
	}

	compileHtml(page) {
		const params = this.prepareTemplate(page);
		const raw = this.processTemplate(params);
		const loc = meta.isProject(page)
			? dirs.projects
			: '';
		const fileName = page.name.toLowerCase() + '.html';
		const out = path.join(this.outputPath, loc, fileName);
		fs.writeFileSync(out, raw);
		log.print('file', ['Compiled', fileName]);
	}

	refreshTemplate() {
		meta = requireUncached(path.join(src.template, 'meta'));
		template = requireUncached(path.join(src.template, 'template'));
	}

	html() {
		meta.pages.forEach(page => this.compileHtml(page));
	}

	run() {
		this.mkdirs();
		this.css();
		this.fonts();
		this.html();
	}

	// For use in serve.js
	paths() {
		return {
			outputPath: this.outputPath,
			rootPrefix: rootDir,
			src: src,
			dirs: dirs
		}
	}
}