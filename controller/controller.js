var mongoose = require("mongoose");
var scraper = require("./scraper");

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongonews'
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

var db = require("../models");

var controller = {
    refreshdata: (callback) => {
        db.Articles.remove({}, function (err) {
            if (err) return handleError(err);
        });
        db.Note.remove({}, function (err) {
            if (err) return handleError(err);
        });
        scraper.scrape((articles) => {
            // console.log(data);
            articles.map((article) => {
                // console.log("**", article)
                db.Articles
                    .create(article)
                    .then((dbArticle) => {
                        // console.log(dbArticle);
                    })
                    .catch((err) => {
                        // return(err);
                    })
            })
            callback("Scrape Complete");
        });
    },
    getArticles: (id, callback) => {
        var query = {};
        id?query._id = id:null;
        console.log(query);
        db.Articles
            .find(query)
            .then(function (dbArticle) {
                callback(dbArticle);
            })
            .catch(function (err) {
                callback({
                    err: err
                });
            });
    },
    delArticle: (id, callback) => {
        db.Articles
            .remove({_id:id})
            .then(function (dbArticle) {
                callback(dbArticle);
            })
            .catch(function (err) {
                callback({
                    err: err
                });
            });
    },
    getNotes: (id, callback) => {
        // console.log("getNotes=>", id);
        db.Articles
            .find(id)
            .then(function (dbArticle) {
                var notes = dbArticle[0].note;
                // console.log("from getNotes",notes)
                db.Note.find({_id: {$in: notes}})
                .then((data)=>{
                    callback(data);
                })
            })
            .catch(function (err) {
                callback({
                    err: err
                });
            });
    },
    addNote: (id,values,callback)=>{
        console.log(id,values);
        db.Note.create(values)
        .then(function(dbnote){
            console.log(id,dbnote._id)
            db.Articles.findByIdAndUpdate(id, { $push: {note: dbnote._id} }, { new: true })
            .then((data)=>{
                callback(dbnote);
            })
            .catch((err)=>{
                throw err;
            })
        })
        .catch(function (err){
            throw err;
        })
    }
}
module.exports = controller;