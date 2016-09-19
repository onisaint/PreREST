var gulp = require('gulp'),
    cla = require('command-line-args'),
    chalk = require('chalk'),
    npm = require('./package.json'),
    nodemon = require('gulp-nodemon'),
    prerest = require('./lib/prerest');

const claOpt = [
    { name: 'src', type: String, alias:'s', multiple: false, defaultOption: false },
    { name: 'multiple', alias:'m', type: String },
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'port', alias: 'p', type: Number },
    { name: 'version', alias:'v', type: Boolean }
];

var opt = cla(claOpt),
    port = true;


gulp.task('serve', function () {
    if(opt.version && !opt.help) console.log(npm.version);
    else if(opt.help && !opt.version){
        console.log("\t" + chalk.white.bold('HELP :'));
        console.log("\t--src|-s fileName.json [--port|-p portNumber]");
        console.log("\t--multiple|-m paths.json [--port|-p portNumber]");
        console.log("\t--help|-h help");
        console.log("\t--version|-v versionNumber");
    }else if(opt.src || opt.multiple){
        if (opt.src && !opt.multiple) {
            var url = {
                src:opt.src,
                path:undefined
            }
            prerest(url, opt.port, true);
            gulp.watch(opt.src, ['restart']);
        }else {
            var urlConstructor = require('./' + opt.multiple.toString().trim());
                path = urlConstructor.root.toString().concat("\\");
            if(path){
                var urlArray = []
                urlConstructor.multiple.forEach(function (url) {
                    urlArray.push({
                        src:path.concat(url.src),
                        path:url.path
                    });
                })
                prerest(urlArray, opt.port, false);
                gulp.watch(opt.multiple, ['restart']);
            }else{
                console.log(chalk.white.bold("No root Defined"));
                return;
            };
        }
    }else if(!(opt.src || opt.help || opt.version || opt.multiple)){
        console.log('Not a valid option. --help for more');
    }
});

gulp.task('restart', function () {
    nodemon({
        script: "./lib/prerest.js",
        tasks: ['serve'],
        ext: 'js json',
        env: { 'NODE_ENV': 'development' }
    })
})