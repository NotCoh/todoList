
let {src,dest} = require("gulp"),
    fs  = require('fs'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    scss = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify-es').default ,
    del = require('del'),
    newer = require('gulp-newer')

let project_name = require('path').basename(__dirname),
    src_folder = "#src";

let path = {
    build : {
        html : project_name +'/',
        css : project_name +'/css/',
        js : project_name +'/js/',
        images : project_name +'/images'
    },
    src : {
        favicon : src_folder + "img/favicon.{jpg,png,svg,gif,ico,webp}",
        html : [src_folder+'/**/*.html','!' + src_folder +'/_*.html'],
        css : src_folder + "/scss/style.scss",
        js : [src_folder +"/js/app.js"],
        images : [src_folder+'/img/**/*.{jpg,png,svg,gif,ico,webp}',"!**/favicon.*"]

    },
    watch : {
        html : src_folder +'/**/*.html;',
        css : src_folder +'/scss/**/*.scss',
        js : src_folder + '/**/*.js',
        images : src_folder +'/img/**/*.{jpg,png,gif,svg,ico,webp',

    },
    clean : './' + project_name + '/'
};

function browserSync(done) {
    browsersync.init({
        server : {
            baseDir: './' + project_name +'/'
        },
        notify:false,
        port:3000
    });
};
function html(){
    return src(path.src.html,{})
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
    
}
function css() {
    return src(path.src.css,{})
    .pipe(
        scss({outputStyle : 'expanded'}).on('error',scss.logError))
    .pipe(
        autoprefixer({
            grid: true,
            overrideBrowserslist : ['last 5 versions'],
            cascade : true
        }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())    
  }


function js(){
    return src(path.src.js,{})
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .on('error',function (err) {console.log(err.toString()); this.emit('end');})
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());


}
function images(){
    return src(path.src.images)
        .pipe(newer(path.build.images))
        .pipe(dest(path.build.images))
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.images], images);
}

let build = gulp.series(clean , gulp.parallel(html,css,js,images)),
    watch = gulp.parallel(build, watchFiles ,browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;

exports.build = build;
exports.watch = watch;
exports.default = watch;