const rimraf = require('rimraf');
const mustache = require('mustache');
const minify = require('html-minifier').minify;
const uglifycss = require('uglifycss');
const fs = require('fs');
const site = require('./site.json');

const dirs = {
	dist: './dist',
	html: './pages',
	css: './css',
	js : './js',
	fonts: './fonts'
};

// CLEAN UP DIST

rimraf.sync(dirs.dist);
fs.mkdirSync(dirs.dist);

console.log('Cleaned ' + dirs.dist);

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
console.log('Finished Compiling templates');

console.log('Uglifying CSS...');
fs.readdir(dirs.css, (err, files) => {
	if(err) {
		console.log('Error')
	}
});