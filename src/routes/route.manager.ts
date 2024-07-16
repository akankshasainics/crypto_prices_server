const cryptoRoute = require("./crypto.route");

const routeManager = (app) => {
    // API Routes
    app.use('/coins', cryptoRoute);

}

module.exports = routeManager;