const rimraf = require('rimraf');
const bs = require('./buildspace');
rimraf.sync(bs.options.output);