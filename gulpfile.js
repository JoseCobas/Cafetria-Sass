const { src, dest, watch, series, parallel } = require('gulp');

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css (done) {
  // compilar sass
  // pasos: 1- identificar archivo, 2- compilarla, 3-  guardar el css

  src('src/scss/app.scss')
    .pipe(sass()) // esto lo que hace es comprimir la carpeta de css, (minificar)
    .pipe(postcss([ autoprefixer()]))
    .pipe(dest('build/css'))
  done();
}
function imagenes () {
  return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'));
  
}
function versionWebp () {
  const opciones = {
    quality:50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))     
    .pipe(dest('build/img'))
}
function versionAvif () {
  const opciones = {
    quality:50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))     
    .pipe(dest('build/img'))
}

function dev () {
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', imagenes);
 // watch('src/scss/app.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);


/* Estas lineas de codigo son mandatorias en todos los proyectos permiten el uso de gulp con sass */

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente.

// parallel - Todas inician al mismo tiempo.