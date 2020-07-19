const { BuildSpace } = require('buildspace');
const Template = require('../src/templating/template');
const Pages = require('../src/pages');

const bs = new BuildSpace({
	copy: ['media'],
});

bs.bulkRegister(Pages, Template);

module.exports = bs;