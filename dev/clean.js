const Compiler = require('./compiler.js');
let comp = new Compiler({build: true});
comp.clean();
comp = new Compiler({build: false});
comp.clean();
console.log('All Clean ✨');