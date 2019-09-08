let http = require("http");
const url = require("url");

function start(route, routes) {
    let server = http.createServer(function(req, res) {
        route(url.parse(req.url).pathname, routes, req, res); 
    });
    server.listen(process.env.PORT || 8880);
}

exports.start = start;