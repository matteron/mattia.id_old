// Page Type Enum
const pageTypes = Object.freeze({
	home: 'home',
	about: 'about',
	projectList: 'projectList',
	project: 'project'
});
exports.pageTypes = pageTypes;

const accentColors = Object.freeze({
	home: 'purple',
	about: 'green',
	projectList: 'red',
	project: 'blue'
});
exports.accentColors = accentColors;

const pages = [
	{
		name: 'Index',
		type: pageTypes.home,
		desc: `Mattia's Site`
	},
	{
		name: 'About',
		type: pageTypes.about,
		desc: 'Who? Me?',
	},
	{
		name: 'Projects',
		type: pageTypes.projectList,
		desc: 'Little of this and that.',
	},
	{
		name: 'Tono',
		type: pageTypes.project,
		desc: 'Cartridge based digital music player.'
	},
	{
		name: 'A-Menu',
		type: pageTypes.project,
		desc: 'Recipe Manager / Weekly Menu Generator for my Mom.'
	},
	{
		name: 'Haipa',
		type: pageTypes.project,
		desc: 'HTML shorthand for JavaScript.'
	}
];
exports.pages = pages;

exports.isHome = function(page) {
	return page.type == pageTypes.home;
}

exports.isProject = function(page) {
	return page.type == pageTypes.project;
}

exports.isProjectList = function(page) {
	return page.type == pageTypes.projectList;
}