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
    res.write("<style>"
                +"body{ background-color: #282a36; font-family:'Fira Sans', sans-serif; }"
                + "div{ color: #ff79c6; padding: 3px; } "
                + " ::-webkit-scrollbar { width: 10px;} "               
                + " ::-webkit-scrollbar-track {background: #f1f1f1;} "
                + " ::-webkit-scrollbar-thumb { background: #44475a;} "
                + " ::-webkit-scrollbar-thumb:hover { background: #6272a4; }"
                +"</style>");
    res.write("<div style='display: flex'>");

    res.write("<div style='overflow-y: scroll; height:600px; width: 50%;  text-align: center;'>");
    evens.map((x) => res.write("<div>" + x + "</div>"));
    res.write("</div>");

    res.write("<br/>");
    
    res.write("<div style='overflow-y: scroll; height:600px; width: 50%; text-align: center;'>");
    odds.map((x) => res.write("<div>" + x + "</div>"));
    res.write("</div>");
    
    res.end();    
}

exports.primes = (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html"});
    let params = url.parse(req.url, true).query;
    let start = params.n1;
    let end = params.n2;

    res.write("<style>"
                +"body{ background-color: #282a36; font-family:'Fira Sans', sans-serif; }"
                + "div{ display:flex; justify-content:center; color: #ff79c6; padding: 3px; } "
                + "h2{ color: #ff5555; } "
                + " ::-webkit-scrollbar { width: 10px;} "               
                + " ::-webkit-scrollbar-track {background: #f1f1f1;} "
                + " ::-webkit-scrollbar-thumb { background: #44475a;} "
                + " ::-webkit-scrollbar-thumb:hover { background: #6272a4; }"
                +"</style>");

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
    res.write("<style>"
                + "body{ background-color: #282a36; font-family:'Fira Sans', sans-serif; }"
                + "div{ color: #ff79c6;} "
                + "p{ color: #ff79c6; font-size: 20pt;} "
                + "h2{ color: #ff5555; } "
                +"</style>");
        
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
    let col = params.coluna;
    let row = params.linha;

    let squares = moves.knightMoves(col, row);    
    let knightURL = "https://cdn3.iconfinder.com/data/icons/business-vol-15/100/Artboard_19-512.png";
    let knight = squares.knight ? 
                                "document.getElementById("+squares.knight+").style.backgroundColor = \"#50fa7b\"; " 
                                + " var img = document.createElement('img'); "
                                + " img.src = \""+ knightURL +"\";"
                                + " img.setAttribute(\"style\", \"width:50px; position:relative; left:5px; \"); "
                                + " document.getElementById("+squares.knight+").appendChild(img); " 
                                : "";
    let urlColor = squares.upperRight ? "document.getElementById("+squares.upperRightLaid+").style.backgroundColor = \"#ff79c6\"; " : "";
    let ullColor = squares.upperLeft ? "document.getElementById("+squares.upperLeftLaid+").style.backgroundColor = \"#ff79c6\"; " : "";
    let lrlColor = squares.lowerRight ? "document.getElementById("+squares.lowerRightLaid+").style.backgroundColor = \"#ff79c6\"; " : "";
    let lllColor = squares.lowerLeft ? "document.getElementById("+squares.lowerLeftLaid+").style.backgroundColor = \"#ff79c6\"; " : "";
    let ursColor = squares.upperRight ? "document.getElementById("+squares.upperRightStand+").style.backgroundColor = \"#ff79c6\"; " : "";
    let ulsColor = squares.upperLeft ? "document.getElementById("+squares.upperLeftStand+").style.backgroundColor = \"#ff79c6\"; " : "";
    let lrsColor = squares.lowerRight ? "document.getElementById("+squares.lowerRightStand+").style.backgroundColor = \"#ff79c6\"; " : "";
    let llsColor = squares.lowerLeft ? "document.getElementById("+squares.lowerLeftStand+").style.backgroundColor = \"#ff79c6\"; " : "";
        
    content += "<script> function plotMoves() { "
            + knight
            + urlColor
            + ullColor
            + lrlColor
            + lllColor
            + ursColor
            + ulsColor
            + lrsColor
            + llsColor
            +"} plotMoves();</script></html>";
    res.write(content);
    res.end();
}

exports.chessJson = (req, res) =>{
    res.writeHead(200,{"Content-Type":"application/json"});
    let params = url.parse(req.url, true).query;
    let col = params.linha;
    let row = params.coluna;

    let squares = moves.knightMoves(col, row);
    res.write(JSON.stringify(squares));
    res.end();
}