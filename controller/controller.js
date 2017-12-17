var mongoose = require ('mongoose');
var scraper = require('./scraper');
var db = require("./models");

mongoose.Promise = Promise;
try{
    mongoose.connect('mongodb://localhost/mongonews');

}catch(err){
    console.log("Mongoose connect error",err);
    throw "Couldn't connect to DB"
}

