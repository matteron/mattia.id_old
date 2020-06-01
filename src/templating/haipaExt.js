const { h } = require('haipa');
const { Tag } = require('haipa/lib/tag');

Tag.prototype.allFonts = function(fontList) {
	return this.forEach(fontList, (tag, f) => tag.font(f));
}

Tag.prototype.projectListing = function(proj) {
	return this.section(h().class('projectEntry')
		.h3(h().class('projectTitle')
			.a(h()
				.href(proj.href)
				.txt(proj.name)
			)
		)
		.p(h().class('projectDesc')
			.txt(proj.desc)
		)
	);
}

Tag.prototype.allProjects = function(pList) {
	return this.forEach(pList, (tag, p) => tag.projectListing(p));
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
	);
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
