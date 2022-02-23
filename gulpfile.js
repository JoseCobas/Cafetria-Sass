const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');



function css (done) {
  // compilar sass
  // pasos: 1- identificar archivo, 2- compilarla, 3-  guardar el css

  src('src/scss/app.scss')
    .pipe(sass()) // esto lo que hace es comprimir la carpeta de css, (minificar)
    .pipe(postcss([ autoprefixer()]))
    .pipe(dest('build/css'))
  done();
}

function dev () {
  watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;

/* Estas lineas de codigo son mandatorias en todos los proyectos permiten el uso de gulp con sass */