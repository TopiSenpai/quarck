/* eslint-env node */
const gulp = require("gulp");

function build() {
	return gulp.src("./src/")
		.pipe(gulp.dest("./build/"));
}

exports.build = build;
