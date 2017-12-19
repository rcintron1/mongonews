
var controller = require("../controller/controller.js");

var controller = {
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/articles", function (req, res) {
        /*list articles and related notes*/
        res.render("index");
    });

}