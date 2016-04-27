var gulp = require('gulp')
var spritesmith = require('gulp.spritesmith')
var compass = require('gulp-compass')
var shell = require('gulp-shell')

var dirs = {
  template: 'icon.mustache',
  dest: './dist',
  icons: './icons',
  imgDest: './dist/img',
  cssDest: './dist/sass'
}

var config = {
  'icons': {
    'src': [dirs.icons + '/*'],
    'imgName': 'icons.png',
    'cssName': 'icons.scss',
    'imgDest': dirs.imgDest,
    'cssDest': dirs.cssDest,
    'cssTemplate': dirs.template,
    'padding': 0
  },

  'icons2': {
    'src': [dirs.icons + '@2/*'],
    'imgName': 'icons@2.png',
    'cssName': 'icons@2.scss',
    'imgDest': dirs.imgDest,
    'cssDest': dirs.cssDest,
    'cssTemplate': dirs.template,
    'padding': 0
  }
}

function sprite (cfg) {
  var sprite = gulp.src(cfg.src)
    .pipe(spritesmith({
      imgName: cfg.imgName,
      cssName: cfg.cssName,
      algorithm: 'binary-tree',
      cssFormat: 'scss',
      cssTemplate: cfg.cssTemplate,
      engine: 'pngsmith',
      padding: cfg.padding
    }))

  sprite.img.pipe(gulp.dest(cfg.imgDest))

  sprite.css.pipe(gulp.dest(cfg.cssDest))
}

gulp.task('sprite', function () {
  sprite(config.icons)
  sprite(config.icons2)
})

gulp.task('styles', function () {
  var cfg = {
    src: [
      dirs.cssDest + '/icons.scss'
    ],
    opts: {
      base: dirs.cssDest
    },
    dir_css: './',
    dir_sass: dirs.cssDest
  }

  gulp.src(cfg.src, cfg.opts)
    .pipe(compass({
      css: dirs.dest,
      sass: cfg.dir_sass
    }))
    .pipe(gulp.dest(cfg.dir_css))
})

gulp.task('build', shell.task([
  'gulp sprite',
  'gulp styles'
]))
