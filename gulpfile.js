var gulp = require('gulp');
var sass = require('gulp-sass'); //编译sass
//var autoprefixer = require('gulp-autoprefixe');
var css = require('gulp-clean-css'); //压缩css
var webserver = require('gulp-webserver'); //起服务
var js = require('gulp-uglify'); //压缩js
var clean = require('gulp-clean') //删除文件
var concat = require('gulp-concat') // 合并文件
var path = require('path');
var url = require('url');
var fs = require('fs');
gulp.task('srever', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                } else {
                    pathname = pathname === "/" ? 'index.html' : pathname;
                }

            }
        }))
})