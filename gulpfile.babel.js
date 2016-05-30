import gulp from 'gulp';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

var workingDir = './sketches';

function compile(watch) {
  var bundler = watchify(browserify(workingDir + '/js/sketch.js', { debug: true }).transform(babelify, {presets: ["es2015"]}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(gulp.dest(workingDir + '/build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('bundling js...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: workingDir + "/",
      index: 'index.html'
    }
  });
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('default', ['browserSync','watch'], () => {
  gulp.watch([workingDir + '/**/*.js'], ['reload']); 
     gulp.watch([workingDir + '/*.html'], ['reload']); 
     gulp.watch([workingDir + '/css/*.css'], ['reload']);
});
