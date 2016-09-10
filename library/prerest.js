var fs = require('fs'),
    app = require('express')(),
    cla = require('command-line-args'),
    npm = require('./../package.json'),
    chalk = require('chalk');

/*const claOpt = [
    { name: 'src', type: String, alias:'s', multiple: false, defaultOption: false },
    { name: 'help', alias: 'h', type: Boolean, defaultOption: true},
    { name: 'port', alias: 'p', type: Number },
    { name: 'version', alias:'v', type: Boolean}
];

var opt = cla(claOpt);

if(opt.version && !opt.help) console.log(npm.version);
else if(opt.help && !opt.version){
    console.log("\t" + chalk.white.bold('HELP :'));
    console.log("\t--src|-s fileName.json [--port|-p portNumber]");
    console.log("\t--help|-h help");
    console.log("\t--version|-v versionNumber");
}else if(opt.src){
     app.get('/', function (req, res) {
         fs.readFile(opt.src, function (err, data) {
             res.json(JSON.parse(data));
         });
     });

    app.listen((opt.port || 7777), function () {
        console.log("running on port : " + (opt.port || 7777));
    });
} else if(!(opt.src || opt.help || opt.version)){
    console.log('Not a valid option. --help for more');
}*/

module.exports = function () {
    return {
        createPath:function (src, path) {
            app.get((path?('/' + path.toString()):'/'), function (req, res) {
                fs.readFile(src, function (err, data) {
                    if(err) console.log(err);

                    res.json(JSON.parse(data));
                })
            })
        },
        createServer:function (port) {
            app.listen((port || 7777), function () {
                console.log("running on port : " + (port || 7777));
            });
        }
    }
}
