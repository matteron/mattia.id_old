const fs = require('fs');
const { normalizedJoin } = require('buildspace/lib/helpers');

const inputDir = 'src';

const accentColors = {
	purple: 'purple',
	green: 'green',
	red: 'red',
	blue: 'blue'
};

const fonts = fs.readdirSync(normalizedJoin(inputDir, 'media', 'fonts'))
	.map(f => normalizedJoin('/media', 'fonts', f));

module.exports = {
	inputDir,
	accentColors,
	fonts
}