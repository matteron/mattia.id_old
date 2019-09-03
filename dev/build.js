const Compiler = require('./compiler.js');
let comp = new Compiler({build: true});
console.log('Building...');
comp.compile();
console.log('All Done 👍');