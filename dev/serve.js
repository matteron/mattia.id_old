const bs = require('./buildspace');
const { Davit } = require('davit');

const prepareProject = require('../src/templating/project');
let Template = require('../src/templating/template');

const src = bs.options.source;
const out = bs.options.output;

bs.enter();

const requireUncached = (module) => {
	delete require.cache[require.resolve(module)];
	return require(module);
}

const dv = new Davit({
	source: src,
	root: out
});

dv.watch('/media/style.css', () => {
	bs.copyFile('/media/style.css');
});

const pagesDir = '/pages/';
dv.watch(pagesDir + '*.md', (_, f) => {
	const name = f.split('.')[0];
	const page = bs.pages.find(p => p.path === name);
	if (page) {
		page.renderBody();
		bs.writeToFile(page.path, bs.compilePage(page));
	}
});

const projectsDir = pagesDir + 'projects/';
dv.watch(projectsDir + '*.md', (e, f) => {
	const name = f.split('.')[0];
	const index = bs.pages.findIndex(p => p.path === 'projects/' + name);
	if (index > -1) {
		bs[index] = prepareProject(src + projectsDir, f);
		bs[index].template = new Template();
		bs[index].renderBody();
		const compiled = bs.compilePage(bs[index]);
		bs.writeToFile(bs[index].path, compiled);
	}
});

dv.watch('/templating/template.js', () => {
	Template = requireUncached('../src/templating/template');
	bs.pages.forEach(p => p.template = new Template());
	bs.enter();
});

dv.start();

process.on('SIGINT', function() {
	require('./clean');
	process.exit();
});
