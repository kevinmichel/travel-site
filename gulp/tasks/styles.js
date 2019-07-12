const { watch, series, parallel, src, dest } = require('gulp');
const Autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const Cssvars = require('postcss-simple-vars');
const cssNested = require('postcss-nested');
const cssImport = require('postcss-import');

function css() {
    return src('app/assets/styles/styles.css')
    .pipe(postcss([cssImport, Cssvars, cssNested, Autoprefixer]))
    .pipe(dest('app/temp/styles'));
}