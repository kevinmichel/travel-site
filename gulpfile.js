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

// Sprites Magic

// Object Literal
var config = {
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
    return src('./app/temp/sprite/css/**/*.svg')
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

// CSS Magic

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

exports.icons = series(beginClean, createSprite, copySpriteGraphic, copySpriteCss, endClean);

// exports.reload = reload;

// exports.default = function() {
//     watch('app/assets/styles/**/*.css', css);
// };

// function copy() {
//     return src('app/assets/styles/styles.css')
//       .pipe(dest('app/temp/styles'));
// }