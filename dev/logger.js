// This is a purposely overly complicated console output.
// Why? Cuz it was kinda fun.

class Logger {
	constructor() {

		this.verbmoji = {
			'Uglifying': '🦢',
			'Linking': '🔗',
			'Copying': '📦',
			'Compiling': '📝'
		}

		this.strings = {
			outputFound: 'Output Path Found 🔍\n',
			outputMade: 'Created output paths 📁\n',
			cleaned: 'Cleaned',
			file: (verb) => ' - '+ verb +': ',
			verbing: (subject, verb) => verb + ' ' + subject + '...',
			finished: (subject, verb) => 'Finished ' + verb + ' ' + subject + ' ' + this.verbmoji[verb] +'\n'
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

module.exports = new Logger();