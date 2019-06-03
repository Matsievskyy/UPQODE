const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');


const cssFiles = [
    './src/sass/main.sass',
    './src/sass/media.sass'
]




const jsFiles = [
    './src/js/main.js',
    './src/js/map.js'
]



function fonts() {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./build/fonts'))
}

function fonts() {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./build/fonts'))
}


function styles() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function imageMin() {
    return gulp.src('./src/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./build/img'))
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))



        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}



function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/sass/**/*.sass', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('watch', watch);

gulp.task('build', gulp.series(imageMin, fonts,  gulp.parallel(styles, scripts)));

gulp.task('dev', gulp.series('build', 'watch'));