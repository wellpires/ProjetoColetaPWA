var gulp = require('gulp');
var swPrecache = require('sw-precache');

gulp.task('generate-sw', function() {
  var swOptions = {
    staticFileGlobs: [
      './*.html',
      './images/*.{png,svg,gif,jpg}',
      './script/*.js',
      './styles/*.css',
      './scss/*.scss',
      './plugins/*.js'
    ],
    stripPrefix: './',
    runtimeCaching: [{
      urlPattern: /^https:\/\/coletaWS.mybluemix.net/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'coletaDadosCache-v1'
        }
      }
    }]
  };
  return swPrecache.write('./service-worker.js', swOptions);
});

gulp.task('default',['generate-sw']);
