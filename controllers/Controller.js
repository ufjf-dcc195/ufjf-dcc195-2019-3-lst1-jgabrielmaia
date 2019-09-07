const fs = require('fs');
const url = require('url');
const primes = require('./../utils/Primes');
const randomNumbers = require('./../utils/RandomNumbers');

exports.index = (req, res) =>  {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write("<h1>Hello Node!</h1>");
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
        let x = randomNumbers.randomNumberBetween(0, i * 3);
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

exports.primes = (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html"});
    let params = url.parse(req.url, true).query;
    let start = params.n1;
    let end = params.n2;

    if(!(start || end )){
        res.write("<h2>Please, provide two numbers on your query.");
        res.end();
    }

    if(!(start < end && end < 100)){
        res.write("<h2>Numbers out of bounds. Rule: N1 < N2 < 100");
        res.end();
    }

    let primeList = primes.calculatePrimesForRange(start, end);
    primeList.map((x) => res.write("<div>" + x + "</div>"));  

    res.end();
}