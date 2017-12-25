

var controller = require("../controller/controller.js");
module.exports = function (app) {

    //Use Handlebars beyond this point
    app.get("/api/refresh/", function (req, res) {
        console.log("**->/api/refresh")
        controller.refreshdata((data)=>{
            console.log(data);
            res.send();
        });
    });
    app.get("/api/article/:id", function (req, res) {
        console.log(req.params.id)
        controller.getArticles(req.params.id,(data)=>{
            console.log(data);
            res.send(data);
        });
    });
    app.delete("/api/article/:id", function (req, res) {
        console.log(req.params.id)
        controller.delArticle(req.params.id,(data)=>{
            console.log(data);
            res.send(/*some json data*/);
        });
    });
    app.get("/api/note/:id", function (req, res){
        // controller.getNotes
    });
    app.post("/api/note/:id", function(req, res){
        controller.addNote(req.params.id,req.body,(data)=>{
            console.log(data);
            res.send(data);
        });
        
    });
}

