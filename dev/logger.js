const chalk = require('chalk');

// This is a purposely overly complicated console output.
// Why? Cuz it was kinda fun.
module.exports = class Logger {
	constructor() {

		this.verbmoji = {
			'Uglifying': '🦢',
			'Linking': '🔗',
			'Copying': '📦',
			'Compiling': '📝'
		}

		this.strings = {
			outputFound: chalk.green('Output Path Found 🔍\n'),
			outputMade: chalk.green('Created output paths 📁\n'),
			cleaned: chalk.green('Cleaned '),
			file: (verb) => chalk.yellow(' - '+ verb +': '),
			verbing: (subject, verb) => chalk.cyan(verb + ' ' + subject + '...'),
			finished: (subject, verb) => (
				chalk.green(
					'Finished ' + verb + ' ' + subject + ' ' + this.verbmoji[verb] +'\n'
				)
			)
		}

		this.commands = {
			outputfound: (f) => this.strings[f ? 'outputFound' : 'outputMade'],
			cleaned: (path) => this.strings.cleaned + path,
			file: (action, path) => this.strings['file'](action) + path,
			verb: (v, s, f) => this.strings[f ? 'finished' : 'verbing'](s, v),
		};

	}

	print(command, args) {
		console.log(this.commands[command](...args));
	}
}