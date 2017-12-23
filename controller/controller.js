var mongoose = require("mongoose");
var scraper = require("./scraper");

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongonews'
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

var db = require("../models");

var controller = {
    refreshdata: () => {
        scraper.scrape((articles) => {
            // console.log(data);
            articles.map((article) => {
                console.log("**", article)
                db.Articles
                    .create(article)
                    .then((dbArticle) => {
                        // console.log(dbArticle);
                        return ("Scrape Complete");
                    })
                    .catch((err) => {
                        // return(err);
                    })

            });

        });
    },
    getdata:(callback)=>{
        db.Articles
        .find({})
        .then(function(dbArticle){
            callback(dbArticle);
        })
        .catch(function(err){
            callback({err:err});
        });
    }
    
}
module.exports=controller;