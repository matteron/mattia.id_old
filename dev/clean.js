const rimraf = require('rimraf');
const log = require('./logger.js');
const Compiler = require('./compiler.js');
let comp = new Compiler(true);
clean();
comp = new Compiler();
clean();
console.log('All Clean ✨');

function clean() {
	rimraf.sync(comp.outputPath);
	log.print('cleaned', [this.outputPath]);
}
module.exports = clean;