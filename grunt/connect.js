/**
 * Execute Grunt local server for development environment. 
 * @command: grunt dev -> Automatically opens a new tab in the default browser on http://localhost:8000/
 * ===============================
 */

module.exports = {
	options: {
		hostname: '*',
		port: '<%= hosts.development.port %>',
		open: '<%= hosts.development.url %>:<%= hosts.development.port %>/'
	},
	dev: {
		options: {
			livereload: true
		}
	}
};