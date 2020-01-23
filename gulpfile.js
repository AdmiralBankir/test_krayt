"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");

var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

var rename = require("gulp-rename");
var server = require("browser-sync").create();

var posthtml = require("gulp-posthtml");

var del = require("del");


gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
})

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(posthtml())
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build")
});

gulp.task("build", gulp.series(
  "clean",
  "css",
  "html"));

gulp.task("start", gulp.series("build", "server"));
