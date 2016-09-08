var fs = require('fs'),
    app = require('express'),
    cla = require('command-line-args');

const claOpt = [
    { name: 'src', type: String, alias:'s', multiple: false, defaultOption: false },
    { name: 'help', alias: 'h', type: Boolean, defaultOption: true},
    { name: 'port', alias: 'p', type: Number },
    { name: 'version', alias:'v', type: Boolean}
];

var opt = cla(claOpt);

if(!(opt.src || opt.help)){
    console.log('Not a valid option. --help for more');
}

console.log(opt);