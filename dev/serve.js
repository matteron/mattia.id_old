const path = require('path');
const clean = require('./clean');
const Compiler = require('./compiler');
const bs = require('browser-sync').create('devServer');

console.log('Performing initial build...');
let comp = new Compiler(false);
comp.run();

const compPaths = comp.paths();
const meta = require(path.join(compPaths.src.template, 'meta'));

console.log('Starting server...');
bs.init({
	server: [compPaths.outputPath, compPaths.rootPrefix],
});

function recompileTemplate(fp, subdir) {
	let type = path.extname(fp);
	let baseName = path.basename(fp, type);
	let name = subdir ? path.join(subdir, baseName) : baseName;
	let page = meta.pages.find((e) => e.name.toLowerCase() === name.toLowerCase());
	if (page) {
		comp.compileHtml(page);	
	}
}

const paths = {
	templates: path.join(compPaths.rootPrefix, compPaths.dirs.template, '*.js'),
	css: path.join(compPaths.src.css, '*.css'),
	compiled: compPaths.outputPath,
	pages: path.join(compPaths.src.pages, '*.md'),
	projects: path.join(compPaths.src.pages, 'projects/*.md'),
}

bs.watch(paths.templates).on('change', () => comp.html());
bs.watch(paths.css).on('change', (path) => bs.reload(path));
bs.watch(paths.pages).on('change', (path) => recompileTemplate(path));
bs.watch(paths.projects).on('change', (path) => recompileTemplate(path, compPaths.dirs.project));
bs.watch(paths.compiled).on('change', (path) => bs.reload(path));

process.on('SIGINT', function() {
    console.log('\nCleanining up...');
	clean();
	console.log('Buh bye 👋');
    process.exit();
});