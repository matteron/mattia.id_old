const fs = require('fs');
const { normalizedJoin, distinct } = require('buildspace/lib/helpers');

const inputDir = 'src';

const accentColors = {
	purple: 'purple',
	green: 'green',
	red: 'red',
	blue: 'blue'
};

const extOrder = [
	'.woff2',
	'.woff',
	'.ttf',
	'.svg',
	'.eot'
];

const fonts = fs.readdirSync(normalizedJoin(inputDir, 'media', 'fonts'))
	.map(f => f.split('.')[0])
	.filter(distinct)
	.map(f => {
		const ext = extOrder.find(ext => {
			const path = normalizedJoin(inputDir, 'media', 'fonts', f + ext);
			return fs.existsSync(path);
		});
		return f + ext;
	})
	.map(f => normalizedJoin('/media', 'fonts', f))

module.exports = {
	inputDir,
	accentColors,
	fonts
}