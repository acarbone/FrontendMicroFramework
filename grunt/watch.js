/**
 * Watch for new changes.
 * Automatically called from:
 * @command: grunt dev
 * ===============================
 */

module.exports = {
	options: {
		interrupt: true,
		livereload: true,
	},

	config: {
		files: ['Gruntfile.js'],
	},

	images: {
		files: ['<%= paths.src %>/images/**/*.{gif,png,jpg,GIF,PNG,JPG}'],
		tasks: ['imagemin:dev']
	},

	src: {
		files: ['<%= paths.src %>/**/*.twig'],
		tasks: ['output_twig:dev']
	},

	sass: {
		files: ['<%= paths.src %>/sass/**/*.sass'],
		tasks: ['sass:dev', 'autoprefixer:dev']
	}
};