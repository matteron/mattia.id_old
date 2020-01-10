const Compiler = require('./compiler.js');
let comp = new Compiler(true);
comp.clean();
comp = new Compiler();
comp.clean();
console.log('All Clean ✨');