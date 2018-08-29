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
        .pipe(gulp.dest('./dist/css'))
});


gulp.task('babel', function () {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('copy-img', function() {
    return gulp.src('./src/imgs/*.*')
        .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('copy-html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less任务
    gulp.watch('./src/css/**.less', ['less']);
    gulp.watch('./src/imgs/*.*', ['copy-img']);
    gulp.watch('./src/index.html', ['copy-html']);
    gulp.watch('src/**/*.js', ['babel'])
});


gulp.task('start', ['copy-html', 'copy-img', 'babel', 'less', 'auto'], function() {
    //所需要监听的文件
    var files = [
        "src/**",
    ];

    browserSync.init(files, {
        proxy: 'http://127.0.0.1:3838',
        browser: 'chrome',
        notify: false,
        port: 3001
    });

    gulp.watch(files).on("change", reload);
});
