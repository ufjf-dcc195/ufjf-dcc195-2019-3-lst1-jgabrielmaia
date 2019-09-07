var fs = require('fs');

exports.index = (req, res) =>  {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write("<h1>Hello World!</h1>");
    res.end();
}

exports.notFound = (req, res) => {
    res.writeHead(404, {"Content-Type":"text/html"});
    res.write("<h1>404 Not Found</h1>");
    res.end();
}

exports.about = (req, res) =>  {
    var content = fs.readFileSync(__dirname + '/../pages/about.html');
    res.write(content);
    res.end();
}
