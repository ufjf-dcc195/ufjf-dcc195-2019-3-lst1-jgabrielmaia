const server = require('./server');
const router = require('./routes');
const controller = require('./controllers/Controller.js');

const routes = {};
routes["/"] = controller.index;
routes["/index.html"] = controller.index;
routes["/sobre.html"] = controller.about;
routes["/aleatorio.html"] = controller.random;
routes["/primos.html"] = controller.primes;
routes["/equacao.html"] = controller.equation;
routes["/xadrez.html"] = controller.chess;
routes["/xadrez.json"] = controller.chessJson;
routes["404"] = controller.notFound;

server.start(router.route, routes);