const haipa = require('haipa')(true);
const { link, section, div, h3, a, p } = haipa.tags;
const { href, rel, as, type, classes } = haipa.attr;

function getFileType(path) {
	return path.split('.').pop();
}

const font = function(fontPath) {
	return link([
		rel`preload`,
		as`font`,
		type(`font/${getFileType(fontPath)}`),
		href(fontPath),
		`crossorigin`
	]);
}
exports.font = font;

exports.allFonts = function(fontList) {
	return fontList.reduce((acc, cur) => `${acc}\n${font(cur)}`, '');
}

const css = function(cssPath) {
	return link([
		rel`stylesheet`,
		type`text/css`,
		href(cssPath)
	]);
}
exports.css = css;

exports.allCss = function(cssList) {
	return cssList.reduce((acc, cur) => `${acc}\n${css(cur)}`, '');
}

const projectListing = function(proj) {
	return section([classes`projectEntry`], [
		div([], ['img here ♪']),
		div([classes`projectInfo`], [
			h3([classes`projectTitle`], [
				a([href(`projects/${proj.name}.html`)], [proj.name])
			]),
			p([classes`projectDesc`], [proj.desc])
		])
	]);
}
exports.projectListing = projectListing;

exports.allProjects = function(pList) {
	return pList.reduce((acc, cur) => `${acc}\n${projectListing(cur)}`, '');
}