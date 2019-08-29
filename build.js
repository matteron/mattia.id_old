const rimraf = require('rimraf');
const mustache = require('mustache');
const minify = require('html-minifier').minify;
const uglifycss = require('uglifycss');
const fs = require('fs');
const site = require('./site.json');

const dirs = {
	dist: 'dist',
	html: 'pages',
	css: 'css',
	js : 'js',
	fonts: 'fonts'
};
const cssFileName = 'ugly';

// CLEAN UP DIST

rimraf.sync(dirs.dist);
fs.mkdirSync(dirs.dist);

console.log('Cleaned ' + dirs.dist + '\n');

// COMPILE MUSTACHE TEMPLATES DOWN TO MINIFIED HTML

console.log('Compiling templates...');
const base = fs.readFileSync('./base.mustache', 'utf-8');
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
site.forEach(page => {
	page.body = fs.readFileSync(dirs.html + '/' + page.name + '.html', 'utf-8');
	let output = minify(mustache.render(base, page), minifyArgs);
	fs.writeFileSync(dirs.dist + '/' + page.name + '.html', output);
	console.log(' - Finished Compiling: ' + page.name);
});
console.log('Finished Compiling Templates\n');

// UGLIFY CSS

console.log('Uglifying CSS...');
fs.mkdirSync(dirs.dist + '/' + dirs.css);
var sheets = fs.readdirSync(dirs.css);
sheets.forEach((path, i) => {
	sheets[i] = dirs.css + '/' + path;
})
var css = uglifycss.processFiles(sheets);
fs.writeFileSync(dirs.dist + '/' + dirs.css + '/' + cssFileName + '.css', css);
console.log(' - Wrote to: ' + cssFileName + '.css');
console.log('Finished Uglifying\n');

// COPY FONTS OVER
console.log('Copying Fonts...');
fs.mkdirSync(dirs.dist + '/' + dirs.fonts);
fs.readdirSync(dirs.fonts).forEach((font) => {
	fs.copyFileSync(dirs.fonts + '/' + font, dirs.dist + '/' + dirs.fonts + '/' + font);
	console.log(' - Copied: ' + font);
});
console.log('Finished Copying Fonts\n');

console.log('All Done 👍');