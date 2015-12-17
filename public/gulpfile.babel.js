/**
 * Léo Le Bras
 * http://leolebras.com/
 *
 * Work with Gulp
 * http://gulpjs.com/
 *
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base64 from 'gulp-base64';
import clean  from 'gulp-rimraf';
import cssbeautify  from 'gulp-cssbeautify';
import cssnano  from 'gulp-cssnano';
import gulp  from 'gulp';
import gulpWebpack  from 'gulp-webpack';
import imagemin  from 'gulp-imagemin';
import inline  from 'gulp-inline-source';
import postcss  from 'gulp-postcss';
import sass  from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import watch  from 'gulp-watch';
import webpack  from 'webpack';
import argv from 'yargs';

import config from './config.js';
const { srcDir, buildDir, cssDir, imgDir, sassDir, fontsDir, jsDir } = config.dir;



// Sass
gulp.task('sass', () => {

    return gulp.src([srcDir + 'sass/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([
            require('autoprefixer')({
                browsers: config.css.autoprefixer
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

    let vueLoader = {
        autoprefixer: {
            browsers: ['last 30 versions']
        }
    };
    if(!argv.argv.watch) {
        vueLoader = {
            ...vueLoader,
            css: ExtractTextPlugin.extract('css')
        };
    }

    return gulp.src(`${srcDir + jsDir}*.js`)
        .pipe(gulpWebpack({
            devtool: 'source-map',
            entry: entry,
            output: {
                path: config.dir.buildDir + config.dir.jsDir,
                publicPath: '',
                filename: '[name]'
            },
            resolve: {
                extensions: ['', '.js', '.vue'],
                modulesDirectories: [
                    'node_modules',
                    'src/js/',
                    'src/js/vendors',
                    'src/js/helpers',
                    'src/js/components'
                ]
            },
            watch: argv.argv.watch,
            module: {
                loaders: [{
                    loader: 'babel-loader',
                    query: config.javascript.babel
                }, {
                    test: /\.vue$/,
                    loader: 'vue'
                }, {
                    test: /\.json?$/,
                    loader: 'json'
                }, {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    loaders: [
                      'url?limit=1000&name=../img/[name].[ext]',
                      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                    ]
                }]
            },
            vue: {
                loaders: vueLoader
            },
            plugins: [
                new ExtractTextPlugin('[name].css', { disabled: !argv.argv.watch }),
            ].concat(
                !argv.argv.watch ? [
                    new webpack.optimize.UglifyJsPlugin()
                ] : []
            ),
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



// Dev
gulp.task('dev', ['clean'], () => {
    gulp.start('sass', 'img', 'js', 'html');
    watch(srcDir + imgDir + '**', () => gulp.start('img'));
    watch(srcDir + sassDir + '**/*.scss', () => gulp.start('sass'));
    watch(srcDir + '*.html', () => gulp.start('html'));
});



// Build
gulp.task('build', ['sass', 'img', 'js', 'html'], () => {

    // Move js/*.css to css
    gulp.src(buildDir + jsDir + '*.css')
        .pipe(gulp.dest(buildDir + cssDir));

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
