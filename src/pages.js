const Page = require('./templating/page');
const { accentColors } = require('./meta');

// Sorted Newest to oldest
const projects = [
	new Page({
		path: 'projects/haipa',
		data: {
			title: 'Haipa',
			desc: 'HTML templating shorthand for JavaScript.'
		}
	}),
	new Page({
		path: 'projects/a-menu',
		data: {
			title: 'A-Menu',
			desc: 'Recipe Manager / Weekly Menu Generator for my Mom.'
		}
	}),
	new Page({
		path: 'projects/tono',
		data: {
			title: 'Tono',
			desc: 'Cartridge based digital music player.',
		}
	})
].map(p => {
	p.data.accent = accentColors.blue;
	return p;
});

const base = [
	new Page({
		path: 'index',
		data: {
			desc: `Mattia's Site`,
			accent: accentColors.purple,
		}
	}),
	new Page({
		path: 'about',
		data: {
			title: 'About',
			desc: 'Who? Me?',
			accent: accentColors.green
		}
	}),
	new Page({
		path: 'projects',
		data: {
			title: 'Projects',
			desc: 'Little of this and that.',
			accent: accentColors.red
		},
		projectList: projects.map(p => ({name: p.data.title, desc: p.data.desc}))
	})
];

module.exports = base.concat(projects);