/**
 * Léo Le Bras
 * http://leolebras.com/
 *
 * Work with Gulp
 * http://gulpjs.com/
 *
 * Copyright 2014 - 2015
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Date of creative : 2014-01-04
 * Last updated: 2015-11-27
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base64 from 'gulp-base64';
import babel from 'gulp-babel';
import clean  from 'gulp-rimraf';
import cssbeautify  from 'gulp-cssbeautify';
import cssnano  from 'gulp-cssnano';
import gulp  from 'gulp';
import imagemin  from 'gulp-imagemin';
import inline  from 'gulp-inline-source';
import postcss  from 'gulp-postcss';
import sass  from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import uglify  from 'gulp-uglify';
import ttf2woff  from 'gulp-ttf2woff';
import ttf2woff2  from 'gulp-ttf2woff2';
import watch  from 'gulp-watch';
import webpack  from 'gulp-webpack';
import argv from 'yargs';

import config from './config.js';
const { srcDir, buildDir, cssDir, imgDir, sassDir, fontsDir, jsDir } = config.dir;



// Sass
gulp.task('sass', () => {

    let customFonts = {},
        weights = [],
        fonts = config.fonts.custom;

    weights[300] = 'Light';
    weights[400] = 'Regular';
    weights[600] = 'SemiBold';
    weights[700] = 'Bold';
    weights[800] = 'ExtraBold';

    for(let font in fonts) {
        customFonts[font] = {variants: {}};
        fonts[font].map(weight => {
            let url = {};
            config.fonts.formats.split(' ').map(format => {
                url[format] = `./../fonts/${font.replace(/\s+/g, '')}/${font.replace(/\s+/g, '')}-${weights[weight]}.${format}`;
            });
            customFonts[font]['variants'][weight] = {
                normal: { url: url }
            };
        });
    }

    return gulp.src([srcDir + 'sass/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([
            require('autoprefixer')({
                browsers: config.css.autoprefixer
            }),
            require('postcss-font-magician')({
                custom: customFonts,
                formats: config.fonts.formats
            })
        ]))
        .pipe(cssbeautify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + cssDir));;
});



// Babel
gulp.task('js', () => {
    let entry = {};
    config.javascript.entry.map(item => {
        entry = { ...entry, [item]: `${config.dir.srcDir}${config.dir.jsDir}${item}` };
    });

    return gulp.src(`${srcDir + jsDir}*.js`)
        .pipe(webpack({
            devtool: 'source-map',
            entry: entry,
            output: {
                path: config.dir.buildDir + config.dir.jsDir,
                filename: '[name]',
            },
            watch: argv.argv.watch,
            module: {
                loaders: [{
                    loader: 'babel-loader',
                    query: config.javascript.babel
                }, {
                    test: /\.vue$/,
                    loader: 'vue'
                }]
            },
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract('css')
                }
            },
            plugins: [
                new ExtractTextPlugin('[name].css')
            ]
        }))
        .pipe(gulp.dest(buildDir + jsDir));
});



// Images
gulp.task('img', () => (
    gulp.src(srcDir + imgDir + '**')
        .pipe(imagemin())
        .pipe(gulp.dest(buildDir + imgDir))
));



// HTML
gulp.task('html', () => (
    gulp.src(srcDir + '*.html')
        .pipe(gulp.dest(buildDir))
));



// Cleaner
gulp.task('clean', () => (
    gulp.src(buildDir, {
        read: false
    }).pipe(clean())
));



// Fonts
gulp.task('fonts', () => {

    // ttf to woff
    gulp.src(srcDir + 'fonts/**/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest(buildDir + fontsDir));

    // ttf to woff2
    gulp.src(srcDir + 'fonts/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest(buildDir + fontsDir));

});



// Dev
gulp.task('dev', ['clean'], () => {
    gulp.start('fonts', 'sass', 'img', 'js', 'html');
    watch(srcDir + imgDir + '**', () => gulp.start('img'));
    watch(srcDir + sassDir + '**/*.scss', () => gulp.start('sass'));
    watch(srcDir + fontsDir + '**/*', () => gulp.start('fonts'));
    watch(srcDir + '*.html', () => gulp.start('html'));
});



// Build
gulp.task('build', ['sass', 'img', 'js', 'html'], () => {

    // Move img files
    gulp.src(buildDir + imgDir + '**')
        .pipe(gulp.dest(buildDir + imgDir));

    // Move html files + inline scripts
    gulp.src(buildDir + '*.html')
        .pipe(inline())
        .pipe(gulp.dest(buildDir));

    // Move fonts files
    gulp.src(srcDir + fontsDir + '**/*')
        .pipe(gulp.dest(buildDir + fontsDir));

    // Base64 img in css files files and minify (except css font files)
    gulp.src(buildDir + cssDir + '*')
        .pipe(base64({
            extensions: ['svg', 'png', 'jpg']
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(buildDir + cssDir));

    // Uglify js files
    gulp.src(buildDir + jsDir + '*.js')
        .pipe(babel(config.javascript.babel))
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + jsDir));

});




/*

      _____       _
     / ____|     | |
    | |  __ _   _| |_ __
    | | |_ |  | | | |  _ \
    | |__| | |_| | | |_) |
     \_____|\__,_|_|  __/  .
                   | |
                   |_|

*/
