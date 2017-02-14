var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');
var swPrecache = require('sw-precache');

gulp.task('sass', function () {
  return gulp
    .src('./scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./scss/'))
    .pipe(minifyCss({}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./scss/'));
});

gulp.task('generate-sw', function() {
  var swOptions = {
    staticFileGlobs: [
            './*.html',
            './images/*.{png,svg,gif,jpg}',
            './script/*.js',
            './styles/*.css',
            './scss/*.scss',
            './plugins/*.js',
            './plugins/lovefield/builddef/*.js',
            './plugins/lovefield/dist/*.{js, json, md, td, map,}',
            './plugins/lovefield/lib/*.js',
            './plugins/lovefield/lib/backstore/*.js',
            './plugins/lovefield/lib/cache/*.js',
            './plugins/lovefield/lib/index/*.js',
            './plugins/lovefield/lib/pred/*.js',
            './plugins/lovefield/lib/proc/*.js',
            './plugins/lovefield/lib/query/*.js',
            './plugins/lovefield/lib/schema/*.js',
            './plugins/lovefield/lib/structs/*.js',
            './plugins/lovefield/spac/*.js',
            './plugins/lovefield/*.{js, yml}'
        ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'coletaDadosCache-v4'
        }
      }
    }]
  };
  return swPrecache.write('./service-worker.js', swOptions);
});

gulp.task('serve', ['generate-sw'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
  browserSync({
    notify: false,
    logPrefix: 'coletaAmostra',
    server: ['.'],
    open: false
  });
  gulp.watch([
    './*.html',
    './script/*.js',
    './styles/*.css',
    '!./service-worker.js',
    '!./gulpfile.js'
  ], ['generate-sw'], browserSync.reload);
});

gulp.task('default', ['serve']);
