const rimraf = require('rimraf');
const mustache = require('mustache');
const minify = require('html-minifier').minify;
const uglifycss = require('uglifycss');
const fs = require('fs');
const path = require('path');

// Setup Variables

const rootPrefix = './src/';
const dist = 'dist';

const dirs = {
	html: 'pages',
	css: 'css',
	js : 'js',
	fonts: 'fonts',
	temps: 'templating'
};
const root = {
	html: path.join(rootPrefix, dirs.html),
	css: path.join(rootPrefix, dirs.css),
	js : path.join(rootPrefix, dirs.js),
	fonts: path.join(rootPrefix, dirs.fonts),
	temps: {
		base: path.join(rootPrefix, dirs.temps, 'base.mustache'),
		data: path.join('../src/', dirs.temps, 'site.json')
	}
}

const uglifyOutput = 'ugly.css';

// CLEAN UP DIST

rimraf.sync(dist);
fs.mkdirSync(dist);

console.log('Cleaned ' + dist + '\n');

// COMPILE MUSTACHE TEMPLATES DOWN TO MINIFIED HTML

console.log('Compiling templates...');

const base = fs.readFileSync(root.temps.base, 'utf-8');
const data = require(root.temps.data);

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
data.forEach(page => {
	let ext = '.html'
	let loc = path.join(root.html, page.name + ext)
	page.body = fs.readFileSync(loc, 'utf-8');

	let compiled = minify(mustache.render(base, page), minifyArgs);
	let newPath = path.join(dist, page.name + ext)
	fs.writeFileSync(newPath, compiled);

	console.log(' - Finished Compiling: ' + page.name + ext);
});
console.log('Finished Compiling Templates\n');

// UGLIFY CSS

console.log('Uglifying CSS...');

fs.mkdirSync(path.join(dist, dirs.css));
var sheets = fs.readdirSync(root.css);

sheets.forEach((file, i) => {
	sheets[i] = path.join(root.css, file);
})
var uglified = uglifycss.processFiles(sheets);
fs.writeFileSync(
	path.join(dist, dirs.css, uglifyOutput),
	uglified
);
console.log(' - Wrote to: ' + uglifyOutput);
console.log('Finished Uglifying\n');

// COPY FONTS OVER
console.log('Copying Fonts...');
fs.mkdirSync(path.join(dist, dirs.fonts));
fs.readdirSync(root.fonts).forEach((font) => {
	fs.copyFileSync(
		path.join(root.fonts, font),
		path.join(dist, dirs.fonts,font)
	);
	console.log(' - Copied: ' + font);
});
console.log('Finished Copying Fonts\n');

console.log('All Done 👍');