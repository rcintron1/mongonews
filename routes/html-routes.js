
var controller = require("../controller/controller.js");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/articles", function (req, res) {
        /*list articles and related notes*/
        res.render("index");
    });

}