const buildspace = require('./buildspace');
const browsersync = require('browser-sync');
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

browsersync.watch(src + '/pages/**/*.md').on('change', (loc) => {
	const name = loc.substr('src/pages/'.length).split('.')[0];
    const page = buildspace.pages.find(p => p.path === name);
    if (page) {
		page.renderBody();
        buildspace.writeToFile(page.path, buildspace.compilePage(page))
    }
    browsersync.reload(loc);
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