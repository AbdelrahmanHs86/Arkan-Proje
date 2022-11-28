const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');

const terser = require('gulp-terser');

const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');




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



// optimize and move images
function optimizeimg() {
    return src('src/assets/images/**/*.{jpg,png,svg}') // change to your source directory
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 }),
        ]))
        .pipe(dest('dist/assets/images')) // change to your final/public directory
};

//conver jpg and png to webp
function webpImage() {
    return src('dist/assets/images/**/*.{jpg,png}') // change to your source directory
        .pipe(imagewebp())
        .pipe(dest('dist/assets/images')) // change to your final/public directory
};


function copyfonts() {
    return src('src/assets/fonts/*.woff')
        .pipe(dest('dist/assets/fonts'))
}


function watchTask() {
    watch('src/scss/**/*.scss', compilescss);
    watch('src/js/*.js', minjs);
    watch('src/assets/images/**/*.{jpg,png,svg}', optimizeimg);
    watch('dist/assets/images/**/*.{jpg,png,svg}', webpImage);

}

exports.default = series(
    compilescss,
    minjs,
    optimizeimg,
    webpImage,
    copyfonts,
    watchTask
);