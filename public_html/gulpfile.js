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
	  './plugins/lovefield/*.{js, yml}',
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
