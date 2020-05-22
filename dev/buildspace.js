const Buildspace = require('buildspace');
const Template = require('../src/templating/template');
const Pages = require('../src/pages');

const bs = new Buildspace({
	copy: ['media'],
});

bs.setDefaultTemplate(Template);
bs.bulkRegister(Pages);

module.exports = bs;