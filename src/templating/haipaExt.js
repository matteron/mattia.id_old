const { h } = require('haipa');
const { HaipaNode } = require('haipa/lib/main/node');

HaipaNode.prototype.allFonts = function(fontList) {
	return this.forEach(fontList, (tag, f) => tag.font(f));
}

HaipaNode.prototype.projectListing = function(proj) {
	return this.section(h().class('projectEntry')
		.h3(h().class('projectTitle')
			.a(h(proj.name).href(proj.href))
		)
		.p(h(proj.desc).class('projectDesc'))
	);
}

HaipaNode.prototype.allProjects = function(pList) {
	return this.forEach(pList, (tag, p) => tag.projectListing(p));
}

const properCase = (text) => text[0].toUpperCase() + text.substr(1).toLowerCase();

HaipaNode.prototype.faIcon = function(name) {
	return this.i(h()
		.class(`icon i-${name}`)
		.alt(properCase(name))
	);
}

HaipaNode.prototype.socialIcon = function(name, href) {
	return this.a(h()
		.href(href)
		.class('hoverFloat')
		.ariaLabel(properCase(name))
		.faIcon(name)
	);
}

const navIconDict = {
	'about': 'user',
	'projects': 'umbrella'
}

HaipaNode.prototype.navIcon = function(name, current) {
	return this.li(h()
		.a(h().href(`/${name}.html`)
			.class(`navLink ${current === properCase(name) ? 'location' : ''}`)
			.i(h().class(`icon i-${navIconDict[name]} fastWiggle`))
			.span(h(properCase(name)))
		)
	);
}

HaipaNode.prototype.navList = function(current) {
	return this.ul(h()
		.id('navList')	
		.class('bigShadow')
		.navIcon('about', current)
		.navIcon('projects', current)
	);
}

module.exports = HaipaNode;
