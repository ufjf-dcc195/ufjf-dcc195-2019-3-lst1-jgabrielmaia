const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const primes = require('./../utils/Primes');
const randomNumbers = require('./../utils/RandomNumbers');
const solver = require('./../utils/QuadraticSolver');
const moves = require('./../utils/KnightMoves');

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
    let content = fs.readFileSync(__dirname + '/../pages/chess.html', "utf-8");
    let params = url.parse(req.url, true).query;
    let col = params.col;
    let row = params.row;

    let squares = moves.knightMoves(col, row);    
    let knightURL = "https://cdn3.iconfinder.com/data/icons/business-vol-15/100/Artboard_19-512.png";
    let knight = squares.knight ? 
                                "document.getElementById("+squares.knight+").style.backgroundColor = \"#50fa7b\"; " 
                                + " var img = document.createElement('img'); "
                                + " img.src = \""+ knightURL +"\";"
                                + " img.setAttribute(\"style\", \"width:50px; position:relative; left:5px; \"); "
                                + " document.getElementById("+squares.knight+").appendChild(img); " 
                                : "";
    let urColor = squares.upperRight ? "document.getElementById("+squares.upperRight+").style.backgroundColor = \"#ff79c6\"; " : "";
    let ulColor = squares.upperLeft ? "document.getElementById("+squares.upperLeft+").style.backgroundColor = \"#ff79c6\"; " : "";
    let lrColor = squares.lowerRight ? "document.getElementById("+squares.lowerRight+").style.backgroundColor = \"#ff79c6\"; " : "";
    let llColor = squares.lowerLeft ? "document.getElementById("+squares.lowerLeft+").style.backgroundColor = \"#ff79c6\"; " : "";
        
    content += "<script> function plotMoves() { "
            + knight
            + urColor
            + ulColor
            + lrColor
            + llColor
            +"} plotMoves();</script></html>";
    res.write(content);
    res.end();
}

exports.chessJson = (req, res) =>{
    res.writeHead(200,{"Content-Type":"application/json"});
    let params = url.parse(req.url, true).query;
    let col = params.col;
    let row = params.row;

    let squares = moves.knightMoves(col, row);
    res.write(JSON.stringify(squares));
    res.end();
}