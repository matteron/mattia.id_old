const Page = require('./templating/page');
const { accentColors } = require('./meta');
const projects = require('./projects');

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
		projectList: projects.map(p => ({
			name: p.data.title,
			href: p.path,
			desc: p.data.desc,
			skip: p.data.skip,
		}))
	})
];

module.exports = base.concat(projects);