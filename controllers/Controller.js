const fs = require('fs');
const url = require('url');

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

randomNumberBetween = (start, end) => {
    return Math.floor(Math.random() * (start - end + 1) + end);
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
    console.log(start);
    let primes = calculatePrimesForRange(start, end);
    primes.map((x) => res.write("<div>" + x + "</div>"));  

    res.end();
}

// source code: https://snippets.bentasker.co.uk/page-1705211104-Find-Prime-Numbers-in-Range-Javascript.html

function calculatePrimesForRange(l,h){
    var primes=[];
    for (i=l; i<h; i++){

        if (checkNumPrime(i)){
          primes.push(i);
        }

    }
    return primes;
}

// Check whether a number is a prime
function checkNumPrime(n){

    // Check whether the number is 1,2 or 3
    if (n<4){
        return true;
    }

    // Check the number isn't directly divisible by 2 or 3
    if (n%2 == 0 || n%3 == 0){
        return false;
    }

    var di=2;
    var i = 5;

    // Don't calculcate higher than the square root (rounded down if needed)
    var lim = Math.floor(Math.sqrt(n));

    while (i < lim){

      if (n%i == 0){
          return false;
      }
      i=i+di;
      di=6-di;
    }

    // If we haven't already returned, n is prime
    return true;
}
