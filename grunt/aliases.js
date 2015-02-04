/**
 * Tasks
 */

module.exports = {
	'default': [
		'newer:output_twig:dist',
		'newer:imagemin:dist',
		'newer:sass:dist',
		'newer:autoprefixer:dist'
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