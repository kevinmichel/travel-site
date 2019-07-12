const { watch, series, parallel, src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const Autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const Cssvars = require('postcss-simple-vars');
const cssNested = require('postcss-nested');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');

function css() {
    return src('app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, Cssvars, cssNested, Autoprefixer]))
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

function serve() {

    browserSync.init({
        notify: false,
        server: {
          baseDir: "app"
        }
      });

      watch('app/index.html', function() {
        browserSync.reload();
    });

    watch('app/assets/styles/**/*.css', series(css, cssInject));
}

exports.serve = serve;
// exports.reload = reload;

// exports.default = function() {
//     watch('app/assets/styles/**/*.css', css);
// };

// function copy() {
//     return src('app/assets/styles/styles.css')
//       .pipe(dest('app/temp/styles'));
// }