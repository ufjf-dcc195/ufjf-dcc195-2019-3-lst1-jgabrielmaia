exports.index = function (req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write("<h1>Hello World!</h1>");
    res.end();
}

exports.notFound = function (req, res) {
    res.writeHead(404, {"Content-Type":"text/html"});
    res.write("<h1>404 Not Found</h1>");
    res.end();
}