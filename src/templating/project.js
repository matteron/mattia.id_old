const fs = require('fs');
const { h } = require('haipa');
const { normalizedJoin } = require('buildspace/lib/helpers');
const meta = require('../meta');
const Page = require('./page');

const parseProps = (raw) => raw.split('\n').filter(p => p).reduce((acc, cur) => {
	const prop = cur.split(': ');
	const key = prop[0];
	const value = prop[1];
	acc[key] = value;
	return acc;
}, {});

const postHeading = (props) => h().div(h().class('postTitle')
	.h2(h(props.title))
	.div(h(props.date))
).render();

const prepareProject = (dir, file) => {
	const loc = normalizedJoin(dir, file);
	const raw = fs.readFileSync(loc, 'utf-8');

	const sets = raw.split('----');
	const props = parseProps(sets[1]);

	console.log(props)

	const path = props.path
		? props.path
		: 'projects/' + file.split('.')[0];

	return new Page({
		path,
		data: {
			accent: meta.accentColors.blue,
			title: props.title,
			desc: props.desc,
			date: new Date(props.date),
			skip: props.skip === 'true',
			raw: sets[0] + postHeading(props) + sets[2],
		}
	});
}

module.exports = prepareProject;