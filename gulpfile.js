const gulp = require('gulp');
const sassify = require('gulp-sass')(require('node-sass'));
const rename = require('gulp-rename');

function adminCss() {
    return gulp.src('./scss/admin/*')
        .pipe(sassify({outputStyle: 'compressed'}))
        .pipe(rename('style.admin.css'))
        .pipe(gulp.dest('./static/build/css/'))
}

function css() {
    return gulp.src('./scss/frontend/*')
        .pipe(sassify({outputStyle: 'compressed'}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./static/build/css/'))
}


gulp.watch(['./scss/admin/*'], adminCss);
gulp.watch(['./scss/frontend/*'], css);

exports.default = css;