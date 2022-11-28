const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');




// Compile, autoprefix, minify, sourcemap, uncss sass files
function compilescss() {
    var plugins = [
        uncss({
            html: ['index.html', 'index2.html']
        }),
    ];

    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(prefixer('last 2 versions'))
        .pipe(minify())
        .pipe(sourcemap.init())
        .pipe(sourcemap.write('./'))
        .pipe(dest('dist/css'))
}


function watchTask() {
    watch('src/scss/**/*.scss', compilescss);


}

exports.default = series(
    compilescss,
    watchTask
);