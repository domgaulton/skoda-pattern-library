var gulp = require('gulp'); 
var gulpif = require('gulp-if'); 
var sourcemaps = require('gulp-sourcemaps');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var pump = require('pump');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var util = require('gulp-util');

// Variables //

var config = {
    app: './app/',
    dist: './dist/',
    root: './',
    dev: !!util.env.dev,                            //check if the dev variable is passed from command line
    env: !!util.env.dev ? "dev" : "production"
}

// Clean //

gulp.task('clean', function () {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

// Nunjuck templating, for static site generation

gulp.task('nunjucks', () => {
    // Gets .html files in the app folder that don't start with underscore
    //gulp.src(config.app+'**/!(_)*.html')
    gulp.src(config.app+'index.html')

    // // Adding data to Nunjucks
    // .pipe(data(file => JSON.parse(fs.readFileSync(`${file.path}.json`))))

    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: config.app,
    }))
    // output files in dist folder
    // .pipe(gulp.dest(config.dist))
    .pipe(gulp.dest(config.root))
    .pipe(browserSync.stream());
});

// Copy Folders to Dist //

// gulp.task('copy-files', function () {
//     gulp.src([config.app+'**/**/*.*', '!'+config.app+'**/*.html', '!'+config.app+'**/*.scss','!'+config.app+'js-global/*.js', '!'+config.app+'scss-global/*.scss', '!'+config.app+'webparts/**/*'])
//         .pipe(gulp.dest(config.dist));
// });

gulp.task('copy-files', function () {
    gulp.src([config.app+'**/**/*.*', '!'+config.app+'**/*.{html,scss}', '!'+config.app+'_**/**/*.*'])
        .pipe(gulp.dest(config.dist));
});

// SASS //

gulp.task('sass', function () {    
    gulp.src([
        config.root+'_config/sass/_config.'+config.env+'.sass',     //include environment config file for global variables
        config.app+'main.scss'
    ])
    .pipe(gulpif(config.dev, sourcemaps.init()))                    //build CSS source map when in dev mode
    .pipe(sass({includePaths: ['scss']}))
    .pipe(gulpif(!config.dev, sass({outputStyle: 'compressed'})))   //minify CSS when not in dev mode
    .pipe(gulpif(config.dev, sourcemaps.write('.')))                //build CSS source map when in dev mode      
    .pipe(gulp.dest(config.dist+'css'));
});

gulp.task('nav', function () {  
    gulp.src(config.app+'dbsd-nav.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest(config.dist+'css'));
});

// Browser Sync //

gulp.task('browser-sync', ['clean'],function() {  
    browserSync.init([config.app+'**/*.scss', config.app+'**/*.js', config.app+'*.html'], {
        server: {
            baseDir: config.root
        }
    });
});

// Concatinate and Uglify to Dist //

gulp.task('scripts', function(){
    return gulp.src([
            config.root+'_config/js/_config.'+config.env+'.js',     //include environment config file for global variables
            config.app+'**/*.js'   
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(config.dist+'js'))
        .pipe(rename('script.js'))        
        .pipe(gulpif(!config.dev, uglify()))                        //minify JS when not in dev mode
        .pipe(gulp.dest(config.dist+'js'));
});

// Watch files for changes //

gulp.task('watch', function(){
    gulp.watch(config.app+'**/*.html', ['nunjucks']);
    gulp.watch(config.app+'**/*.scss', ['sass']);
    gulp.watch(config.app+'**/*.js', ['scripts']);
})

// Gulp Task - Run in Sequence //

gulp.task('default', function () {  
    runSequence('clean', ['nunjucks', 'sass', 'copy-files' , 'browser-sync', 'scripts' ], 'watch');
});