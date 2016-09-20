var fs = require('fs'),
    process = require('process');
    app = require('express')();

module.exports = function (urlObject , port, single) {
    if(single){
        createPath(urlObject.src, urlObject.path);
    } else {
        var path = [];
        urlObject.forEach(function (url) {
            createPath(url.src, url.path)
            path.push("/".concat(url.path))
        })

        app.get('/', function (req, res) {
            res.json({paths:path});
        })
    }

    app.listen((port || 7777), function () {
        console.log("running on port : " + (port || 7777));
    });
}

function createPath(src, path) {
    app.get((path?('/' + path.toString()):'/'), function (req, res) {
        fs.readFile(src, function (err, data) {
            if(err) console.log(err);
            res.json(JSON.parse(data));
        })
    })
}
