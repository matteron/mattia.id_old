const fs = require('fs');
const { h } = require('haipa');
const marked = require('marked');
const { inputDir } = require('../meta');
const { normalizedJoin } = require('buildspace/lib/helpers');

module.exports = class Page {
	constructor({path, data, projectList}) {
		this.path = path;
		this.data = data;
		this.projectList = projectList;
		this.renderBody();
	}

	createList = () => h().div(h()
		.h2(h().txt('little of this and that'))
		.allProjects(this.projectList)
	).render();

	markdown = () => {
		const raw = this.data.raw
			? this.data.raw
			: fs.readFileSync(
				normalizedJoin(inputDir, 'pages', this.path + '.md'),
				'utf-8');
		return marked(raw);
	}

	renderBody = () => {
		this.data.body = this.projectList
			? this.createList()
			: this.markdown();
	}
}