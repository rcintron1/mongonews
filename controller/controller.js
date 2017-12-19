var mongoose = require ("mongoose");
var scraper = require("./scraper");

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mongonews',{useMongoClient: true});

var db = require("../models");
scraper((articles)=>{
    // console.log(data);
    articles.map((article)=>{
        db.Article
            .create(article)
            .then((dbArticle)=>{
                console.log(dbArticle);
                // return("Scrape Complete");
            })
            .catch((err)=>{
                // return(err);
            })

    });

});