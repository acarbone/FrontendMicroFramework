/**
 * Concurrent execution for watch task during grunt dev
 * ===============================
 */

module.exports = {
	options: {
		logConcurrentOutput: true
	},
	dev: ['watch']
};