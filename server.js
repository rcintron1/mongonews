var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");; /*HTTP request logger middleware for node.js*/
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// This is where the programs starts
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});