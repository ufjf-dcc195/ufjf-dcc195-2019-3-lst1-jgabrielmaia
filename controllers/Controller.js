const fs = require('fs');
const url = require('url');
const primes = require('./../utils/Primes');
const randomNumbers = require('./../utils/RandomNumbers');
const qs = require('querystring');
const solver = require('./../utils/QuadraticSolver');

exports.index = (req, res) =>  {
    res.writeHead(200, {"Content-Type":"text/html"});
    let content = fs.readFileSync(__dirname + '/../pages/index.html');
    res.write(content);
    res.end();
}

exports.notFound = (req, res) => {
    res.writeHead(404, {"Content-Type":"text/html"});
    res.write("<h1>404 Not Found</h1>");
    res.end();
}

exports.about = (req, res) =>  { 
    res.writeHead(200, {"Content-Type":"text/html"});
    let content = fs.readFileSync(__dirname + '/../pages/about.html');
    res.write(content);
    res.end();
}

exports.random = (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html"});
    
    let evens = new Array(50);
    let odds = new Array(50);

    for(let i = 0; i < 99; i++){
        let x = randomNumbers.randomNumberBetween(0, i * 3);
        evens[i] = x * 2;
        odds[i] = x * 2 + 1;
    }
    
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

    if(!(start && end )){
        res.write("<h2>Por favor, insira dois inteiros validos.");
        res.end();
    }
    else if(!(start < end && end < 100)){
        res.write("<h2>Numeros fora dos limites. Regra: N1 < N2 < 100");
        res.end();
    } else {
        let primeList = primes.calculatePrimesForRange(start, end);
        primeList.map((x) => res.write("<div>" + x + "</div>"));  
    
        res.end();
    }
}

exports.equation = (req, res) => {
    res.writeHead(200,{"Content-Type":"text/html"});
        
    if(req.method == 'GET'){
        let equationForm = fs.readFileSync(__dirname + '/../pages/equation.html');
        res.write(equationForm);
        res.end();
    } else if (req.method == 'POST'){
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let query = qs.parse(body);
            
            if(!(query.a && query.b && query.c )){
                res.write("<h2>Por favor, insira os 3 valores.");
                res.end();
            }else {
                const [result, result2] = solver.solve(query.a, query.b, query.c);

                if(isNaN(result) || isNaN(result2)){
                    res.write("<h2>Impossivel encontrar raizes.");
                    res.end();
                } else {
                    res.write("<p>" + result + "</p>");  
                    res.write("<p>" + result2 + "</p>");  
                    res.end();
                }   
            }                       
        });
    }
}

exports.chess = (req, res) =>{
    res.writeHead(200,{"Content-Type":"text/html"});
    let content = fs.readFileSync(__dirname + '/../pages/chess.html');
    res.write(content);
    res.end();
}