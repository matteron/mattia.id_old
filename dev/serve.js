const buildspace = require('./buildspace');
const browsersync = require('browser-sync');

const prepareProject = require('../src/templating/project');
let Template = require('../src/templating/template');

const src = buildspace.options.source;
const out = buildspace.options.output;

buildspace.enter();

const requireUncached = (module) => {
	delete require.cache[require.resolve(module)];
	return require(module);
}

browsersync.init({
	server: {
		baseDir: out,
		serveStaticOptions: {
			extensions: ['html']
		}
	}
});

browsersync.watch(src + '/**/*.css').on('change', (loc) => {
	buildspace.copyFile('/media/style.css');
	browsersync.reload(loc);
});

// Normal Pages
const pagesDir = src + '/pages/';
browsersync.watch(pagesDir + '*.md').on('change', (loc) => {
	const name = loc.substr(pagesDir.length).split('.')[0];
	const page = buildspace.pages.find(p => p.path === name);
	if (page) {
		page.renderBody();
		buildspace.writeToFile(page.path, buildspace.compilePage(page));
		browsersync.reload(loc);
	}
});

// Projects
const projectsDir = pagesDir + 'projects/';
browsersync.watch(projectsDir + '*.md').on('change', (loc) => {
	const file = loc.substr(projectsDir.length);
	const name = file.split('.')[0];
	const index = buildspace.pages.findIndex(p => p.path === 'projects/' + name);
	if (index > -1) {
		buildspace[index] = prepareProject(projectsDir, file);
		buildspace[index].template = new Template();
		buildspace[index].renderBody();
		const compiled = buildspace.compilePage(buildspace[index]);
		buildspace.writeToFile(buildspace[index].path, compiled);
		browsersync.reload(loc);
	}
});

browsersync.watch(src + '/templating/template.js').on('change', (loc) => {
	Template = requireUncached('../src/templating/template');
	buildspace.pages.forEach(p => p.template = new Template());
	buildspace.enter();
	browsersync.reload(loc);
});

process.on('SIGINT', function() {
	require('./clean');
	process.exit();
});