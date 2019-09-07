const server = require('./server');
const router = require('./routes');
const controllers = require('./controllers/Controller.js');

const routes = {};
routes["/"] = controllers.index;
routes["/index.html"] = controllers.index;
routes["/sobre.html"] = controllers.about;
routes["/aleatorio.html"] = controllers.random;
routes["404"] = controllers.notFound;

server.start(router.route, routes);