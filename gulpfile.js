var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulp = require('gulp');
var less = require('gulp-less');

const babel = require('gulp-babel');
const concat = require('gulp-concat');


// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('./src/css/**/*.less')
    // 2. 编译为css
        .pipe(less())
        // 3. 另存文件
        .pipe(gulp.dest('./src/css'))
});


gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less任务
    gulp.watch('./src/css/**.less', ['less'])
});

gulp.task('babel', function () {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('start', ['babel', 'less', 'auto'], function() {
    //所需要监听的文件
    var files = [
        "src/**",
    ];

    browserSync.init(files, {
        proxy: 'http://127.0.0.1:3838', //所要代理的地址，端口要与bin/www中的端口一致
        browser: 'chrome',
        notify: false,
        port: 3001    //代理地址的端口号
    });

    gulp.watch(files).on("change", reload);
});
