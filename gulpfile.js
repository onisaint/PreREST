var gulp = require('gulp'),
    cla = require('command-line-args'),
    chalk = require('chalk'),
    npm = require('./package.json'),
    prerest = require('./library/prerest')();

const claOpt = [
    { name: 'src', type: String, alias:'s', multiple: false, defaultOption: false },
    { name: 'multiple', alias:'m', type: String },
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'port', alias: 'p', type: Number },
    { name: 'version', alias:'v', type: Boolean }
];

var opt = cla(claOpt),
    port = 0;

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
            prerest.createPath(opt.src);
            gulp.watch(opt.src, ['serve']);
        }else {
            var urlConstructor = require('./' + opt.multiple.toString().trim());
            urlConstructor.forEach(function (url) {
                prerest.createPath(url.src, url.path);
            })
        }
        if(!port++) prerest.createServer(opt.port);
    }else if(opt.multiple){

    }else if(!(opt.src || opt.help || opt.version || opt.multiple)){
        console.log('Not a valid option. --help for more');
    }
});