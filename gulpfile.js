const { watch, series, parallel, src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const Autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const Cssvars = require('postcss-simple-vars');
const cssNested = require('postcss-nested');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');
const hexRgba = require('postcss-hexrgba');
const webpack = require('webpack');


// var myModernizr = require('gulp-modernizr');
// var usemin = require('gulp-usemin');

var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');


// Readable stream is not being used right now
var pipeline = require('readable-stream').pipeline;

// Custom Webpack DevMiddleware ** Live Reload Not working for JS files... ** //
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// Custom gulp build of modernizr ** Not working ** //
// **try this link instead: https://modernizr.com/download?setclasses //

// function myModernizr() {
//     return src(['./app/assets/styles/**/*.css', './app/dist/**/*.js'])
//     .pipe(modernizr({
//         "options": [
//             "setClasses"
//         ]
//     }))
//     .pipe(dest('./app/dist/'));
// }

// *** Sprites Magic *** //

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

function beginClean() {
    return del(['./app/temp/sprite', './app/asset/images/sprites']);
}

function createSprite() {
    return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'));
}

function copySpriteGraphic() {
    return src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(dest('./app/assets/images/sprites'));
}

function copySpriteCss() {
    return src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(dest('./app/assets/styles/modules'));
}

function endClean() {
    return del(['./app/temp/sprite']);
}

// *** CSS Magic *** //

function css() {
    return src('app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, Cssvars, hexRgba, cssNested, Autoprefixer]))
    .on('error', function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(dest('app/temp/styles'));
}

function cssInject() {
    return src('app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}

// *** Compile JS files with Webpack *** //

// live reload scripts function

function scriptsRefresh() {
    browserSync.reload();
}

// run webpack with config file

function bundleScripts() {
    webpack(webpackConfig);
}

var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

// *** Live Reloads with browserSync server + gulp watch *** //

function serve() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app",
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true }
                }),
                webpackHotMiddleware(bundler)
                        ]
                }
            });


      watch('app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', series(css, cssInject));
    watch('./src/**/*.js', series(bundleScripts, scriptsRefresh));
    // watch('./src/**/*.js', function() {
    //     browserSync.reload();
    // });
}

// exports.scripts = scripts;
// exports.myModernizr = myModernizr;

exports.serve = serve;
exports.icons = series(beginClean, createSprite, copySpriteGraphic, copySpriteCss, endClean);

// *** Automated Production build *** //

var imageFiles = ['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*']
var cssFiles = ['app/temp/styles/*.css']
var jsFiles = ['./app/dist/*.js', '!./app/dist/Vendor.js']
var vendorFiles = ['./app/dist/Vendor.js']

function gulpClean() {
    return del("prod");
}

function optimizeImages() {
    return src(imageFiles)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('prod/assets/images'));
}

function compressVendorJs() {
    return src(vendorFiles)
    .pipe(uglify())
    .pipe(rev())
    .pipe(dest('prod/assets/scripts/vendor'));
}

function compressJs() {
    return src(jsFiles)
    // gulp-concat = concatenates your JS files into one large file
    .pipe(concat('scripts.js'))
    // Minify the Js file
    .pipe(uglify())
    // gulp-rev = file revisioning by appending content hash to filenames
    .pipe(rev())
    // Output
    .pipe(dest('prod/assets/scripts/js'));
}

function CSSminify() {
    return src(cssFiles)
    // Minify the CSS files
    .pipe(cleanCss({compatibility: 'ie8'}))
    // Output    
    .pipe(dest('prod/assets/styles'));
}

function copyHTML() {
    return src('app/index.html')
    // Output    
    .pipe(dest('prod'));
}

exports.prod = series(gulpClean, optimizeImages, compressVendorJs, compressJs, CSSminify, copyHTML);

// usemin is depreciated (use Webpack or Browserify instead)

// function usemin() {
//     return src('./app/index.html')
//     .pipe(usemin())
//     .pipe(dest('./prod'));
// }


