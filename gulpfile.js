const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');

const terser = require('gulp-terser');






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


function minjs() {
    return src('src/js/*.js')
        .pipe(terser())
        .pipe(dest('dist/js'))
}





function watchTask() {
    watch('src/scss/**/*.scss', compilescss);
    watch('src/js/*.js', minjs);


}

exports.default = series(
    compilescss,
    minjs,
    watchTask
);