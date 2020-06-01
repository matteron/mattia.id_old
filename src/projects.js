const fs = require('fs');
const meta = require('./meta');
const prepareProject = require('./templating/project');
const { normalizedJoin } = require('buildspace/lib/helpers');

const dir = normalizedJoin(meta.inputDir, 'pages/projects');

module.exports = fs.readdirSync(dir).reduce((acc, cur) => {
	acc.push(prepareProject(dir, cur));
	return acc;
}, []).sort((a, b) => b.data.date - a.data.date);