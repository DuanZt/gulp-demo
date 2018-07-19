// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
const babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(babel({
          presets: ['env']
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//压缩css
gulp.task('minify-css', () => {
    return gulp.src([
        'css/flexslider.css',
        'css/jquery-fullsizable.css',
        'css/jquery.mCustomScrollbar.min.css',
        'css/all.css',
       ])
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat('all.min.css'))
      .pipe(gulp.dest('css/'));
  });

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src([
        './lib/jquery.min.js',
        './lib/jquery.mousewheel.min.js',
        './lib/jquery.touchSwipe.min.js',
        './lib/jquery.mCustomScrollbar.min.js',
        './lib/jquery.flexslider-min.js',
        './lib/jquery.flexslider-min.js',
        './js/*.js'])
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(babel({
          presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts','minify-css');

    // 监听文件变化
    gulp.watch(['./js/*.js','./scss/*.scss'], function(){
        gulp.run('lint', 'sass', 'scripts','minify-css');
    });
});
