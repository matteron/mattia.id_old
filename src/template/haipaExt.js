const { h } = require('haipa');
const { Tag } = require('haipa/lib/tag');

function getFileType(path) {
	return path.split('.').pop();
}

Tag.prototype.font = function(fontPath) {
	return this.link(h()
		.rel('preload')
		.as('font')
		.type(`font/${getFileType(fontPath)}`)
		.href(fontPath)
		.crossOrigin('true')
	);
}

Tag.prototype.allFonts = function(fontList) {
	fontList.forEach(f => this.font(f))
	return this;
}
// const font = function(fontPath) {
// 	return link([
// 		rel`preload`,
// 		as`font`,
// 		type(`font/${getFileType(fontPath)}`),
// 		href(fontPath),
// 		`crossorigin`
// 	]);
// }
// exports.font = font;

// exports.allFonts = function(fontList) {
// 	return fontList.reduce((acc, cur) => `${acc}\n${font(cur)}`, '');
// }

// const projectListing = function(proj) {
// 	return section([classes`projectEntry`], [
// 		h3([classes`projectTitle`], [
// 			a([href(`projects/${proj.name}.html`)], [proj.name])
// 		]),
// 		p([classes`projectDesc`], [proj.desc])
// 	]);
// }
// exports.projectListing = projectListing;

// exports.allProjects = function(pList) {
// 	return pList.reduce((acc, cur) => `${acc}\n${projectListing(cur)}`, '');
// }

Tag.prototype.projectListing = function(proj) {
	return this.section(h().class('projectEntry')
		.h3(h().class('projectTitle')
			.a(h().href(`projects/${proj.name}.html`).txt(proj.name))
		)
		.p(h().class('projectDesc')
			.txt(proj.desc)
		)
	)
}

Tag.prototype.allProjects = function(pList) {
	pList.forEach(p => this.projectListing(p))
	return this;
}

const properCase = (text) => text[0].toUpperCase() + text.substr(1).toLowerCase();

Tag.prototype.faIcon = function(name) {
	return this.i(h()
		.class(`icon i-${name}`)
		.alt(properCase(name))
	);
}

Tag.prototype.socialIcon = function(name, href) {
	return this.a(h()
		.href(href)
		.class('hoverFloat')
		.ariaLabel(properCase(name))
		.faIcon(name)
	)
}

const navIconDict = {
	'about': 'user',
	'projects': 'umbrella'
}

Tag.prototype.navIcon = function(name, current) {
	return this.li(h()
		.a(h().href(`/${name}.html`)
			.class(`navLink ${current === properCase(name) ? 'location' : ''}`)
			.i(h().class(`icon i-${navIconDict[name]} fastWiggle`))
			.span(h().txt(properCase(name)))
		)
	);
}

Tag.prototype.navList = function(current) {
	return this.ul(h()
		.id('navList')	
		.class('bigShadow')
		.navIcon('about', current)
		.navIcon('projects', current)
	);
}

module.exports = Tag;