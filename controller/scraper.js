var cheerio = require("cheerio"); /*jquery for node*/
var request = require("request"); /*http node client*/

var mongoose = require('mongoose');


module.exports = (callback)=> {
    console.log("**starting scraper**");
    request("https://www.nytimes.com/", function (error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each element with a "title" class
        var articles = []
        $("article").each(function (i, element) {
            var article = {}
            // Save the text and href of each link enclosed in the current element
            article.headline = $(element).children(".story-heading").children("a").text().trim();
            article.summary = $(element).children(".summary").text().trim();
            article.link = $(element).children(".story-heading").children("a").attr("href");

            // If this found element had both a title and a link
            if (article.headline && article.summary) {
                // console.log("\n>>" + headline.trim(), "\n**" + summary.trim(), "\n##" + link);;
                articles.push(article);
            }

        });
        callback(articles);
    });

}