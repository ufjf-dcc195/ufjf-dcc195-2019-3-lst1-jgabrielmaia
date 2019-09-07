const fs = require('fs');

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
    let content = fs.readFileSync(__dirname + '/../pages/about.html');
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(content);
    res.end();
}

exports.random = (req, res) => {
    let evens = new Array(50);
    let odds = new Array(50);

    for(let i = 0; i < 99; i++){
        let x = randomNumberBetween(0, i * 3);
        evens[i] = x * 2;
        odds[i] = x * 2 + 1;
    }

    res.writeHead(200, {"Content-Type":"text/html"});
    
    res.write("<div style='display: flex'>");

    res.write("<div style='overflow-y: scroll; height:400px; width: 50%;  text-align: center;'>");
    evens.map((x) => res.write("<div>" + x + "</div>"));
    res.write("</div>");

    res.write("<br/>");
    
    res.write("<div style='overflow-y: scroll; height:400px; width: 50%; text-align: center;'>");
    odds.map((x) => res.write("<div>" + x + "</div>"));
    res.write("</div>");
    
    res.end();
    
}

randomNumberBetween = (start, end) => {
    return Math.floor(Math.random() * (start - end + 1) + end);
}