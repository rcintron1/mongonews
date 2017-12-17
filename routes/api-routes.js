

var controller = require("../controller/controller.js");
module.exports = function (app) {

    //Use Handlebars beyond this point
    app.get("/api/", function (req, res) {
        
        res.send(/*some json data*/);
    });

}

