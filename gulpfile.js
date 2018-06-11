var gulp = require('gulp');
var sass = require('gulp-sass'); //编译sass
//var autoprefixer = require('gulp-autoprefixe');
var css = require('gulp-clean-css'); //压缩css
var webserver = require('gulp-webserver'); //起服务
var js = require('gulp-uglify'); //压缩js
var clean = require('gulp-clean') //删除文件
var html = require('gulp-htmlmin')
var concat = require('gulp-concat') // 合并文件
var path = require('path');
var url = require('url');
var fs = require('fs');
//起服务
gulp.task('srever', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === "/" ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }));
});
//压缩合并css
gulp.task('sass', function() {
    gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(css())
        .pipe(gulp.dest('style'))
});
//压缩合并js
gulp.task('js', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('style.js'))
        .pipe(js())
        .pipe(gulp.dest('style'));
});
//操作html文件
gulp.task('html', ['srever'], function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('style'));
});