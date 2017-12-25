
var controller = require("../controller/controller.js");

module.exports = (app)=>{
    app.get("/", function (req, res) {
        controller.getArticles(null,(data)=>{
            console.log(data);
            res.render("index",{
                articles:data
            });
        });
        
    });
    app.get("/articles", function (req, res) {
        /*list articles and related notes*/
        controller.refreshdata();
        res.render("index");
    });

}

