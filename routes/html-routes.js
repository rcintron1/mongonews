
var controller = require("../controller/controller.js");

module.exports = (app)=>{
    app.get("/", function (req, res) {
        controller.getdata((data)=>{
            console.log(data);
            res.render("index",{
                articles:data
            });
        });
        
    });
    app.get("/articles", function (req, res) {
        /*list articles and related notes*/
        res.render("index");
    });

}

