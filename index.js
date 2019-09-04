const server = require('./server');
const router = require('./routes');
const controllers = require('./controllers/Controller.js');

const routes = {};
routes["/"] = controllers.index;
routes["404"] = controllers.notFound;

server.start(router.route, routes);