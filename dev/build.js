const Compiler = require('./compiler.js');
let comp = new Compiler(true);
console.log('Building...');
comp.run();
console.log('All Done 👍');