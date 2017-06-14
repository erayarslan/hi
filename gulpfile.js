'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var concat = require('gulp-concat');
var manifest = require('./manifest');
var editor = require("gulp-json-editor");

var getId = function () {
  return (+new Date() + '').split('').map(function (num) {
    return String.fromCharCode(97 + parseInt(num));
  }).join('');
};

var index = [];
var bg = getId() + '.js';

gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});

gulp.task('copy', ['scripts', 'manifest'], function () {
  return gulp.src('assets/**')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('manifest', function () {
  return gulp.src('./manifest.json')
    .pipe(editor(function (json) {
      json.background.scripts = [bg];

      for (var i = 0; i < json.content_scripts.length; i++) {
        json.content_scripts[i].js = [index[i]];
      }

      return json;
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  manifest.content_scripts.forEach(function (content_script) {
    var out = getId() + '.js';

    gulp.src(content_script.js)
      .pipe(concat(out))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    index.push(out)
  });

  return gulp.src(manifest.background.scripts)
    .pipe(concat(bg))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function () {
  gulp.start('copy');
});