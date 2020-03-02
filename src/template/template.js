const { tags, attr } = require('haipa');
const { allFonts, allCss, allProjects } = require('./haipaExt');
const { html, head, title, meta, body, main, header, section, div, a, h1, h2, aside, i, nav, ul, li, span, article, svg, g, path } = tags;
const { classes, lang, name, content, id, alt, href, viewBox, version, xmlns, fill, fillRule, strokeDasharray, strokeLinecap, strokeOpacity, transform, stroke, strokeWidth, d, ariaLabel } = attr;

exports.base = (p) => {
	return html([lang`en`], [
		head([], [
			title([], [`${p.title ? `${p.title} - ` : ''}mattia.id`]),
			meta([name`viewport`, content`width=device-width, initial-scale=1`]),
			meta([name`Description`, content(p.desc)]),
			allFonts(p.fonts),
			allCss(p.css)
		]),
		body([classes`checkerboard`], [
			main([classes(p.accent)], [
				header([], [
					section([id`tiltedTop`], [
						div([id`topText`, classes`bigShadow`], [
							a([href`/`, id`homeLink`, classes`hoverFloat`, alt`Home`], [
								h1([], ['Mattia Schiano'])
							]),
							aside([id`socialLinks`], [
								a([id`git`, href`https://github.com/matteron`, classes`hoverFloat`, ariaLabel`Github`], [
									i([classes`icon i-github`, alt`Github`], []),
								]),
								a([id`twit`, href`https://twitter.com/mattiaschiano_`, classes`hoverFloat`, ariaLabel`Twitter`], [
									i([classes`icon i-twitter`, alt`Twitter`], [])
								])
							])
						]),
						svg([version`1.1`, viewBox`0 0 525 4`, xmlns`http://www.w3.org/2000/svg`, id`headerLine`], [
							g([fill`none`, fillRule`evenodd`, strokeDasharray`12`, strokeLinecap`round`, strokeOpacity`.35`], [
								g([transform`translate(-235, -369)`, stroke`#222`, strokeWidth`4`, id`headerLineColor`], [
									g([transform`translate(237 320)`], [
										path([d`m0 51h550`])
									])
								])
							])
						])
					]),
					nav([], [
						ul([classes`bigShadow`, id`navList`], [
							li([], [
								a([href`/about.html`, classes(`navLink ${p.title == 'About' ? 'location' : ''}`)], [
									i([classes`icon i-user fastWiggle`], []),
									span([], ['About'])
								])
							]),
							li([], [
								a([href`/projects.html`, classes(`navLink ${p.title == 'Projects' ? 'location' : ''}`)], [
									i([classes`icon i-umbrella fastWiggle`], []),
									span([], ['Projects'])
								])
							])
						]),
					])
				]),
				article([classes(`smallShadow ${p.title == 'projects' ? 'markdown' : ''}`), (p.title =='projects' ? id`projectList` : '')], [
					p.body
				])
			])
		]),
	]);
}

exports.projectList = (pList) => {
	return h2([], ['little of this and that']) + allProjects(pList);
}

