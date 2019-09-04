function route(path, controllers, req, res) {
    console.log(`Roteando ${path}`);
    if(controllers[path]){
        controllers[path](req, res);
    }
    else{
        controllers["404"](req, res);
    }
}

exports.route = route;