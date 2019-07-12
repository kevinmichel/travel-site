const { watch, series, parallel, src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
// const bsReload = browserSync.reload;

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