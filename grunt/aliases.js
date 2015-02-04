/**
 * Tasks
 */

module.exports = {
	'default': [
		'output_twig:dist',
		'imagemin:dist',
		'sass:dist',
		'autoprefixer:dist'
	],
	'dev': [
		'output_twig:dev',
		'sass:dev',
		'autoprefixer:dev',
		'connect:dev',
		'concurrent'
	],
	'css-analysis': [
		'csslint:dist',
		'parker:dist'
	],
	'css-analysis:dev': [
		'csslint:dev',
		'parker:dev'
	],
};