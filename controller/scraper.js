var cheerio = require("cheerio"); /*jquery for node*/
var request = require("request"); /*http node client*/

request("https://www.nytimes.com/", function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("article").each(function (i, element) {
        // Save the text and href of each link enclosed in the current element
        
        var headline = $(element).children(".story-heading").children("a").text();
        var summary = $(element).children(".summary").text();
        var link = $(element).children(".story-heading").children("a").attr("href");

        // If this found element had both a title and a link
        if (headline && summary) {
            console.log("\n>>" + headline.trim() , "\n**" + summary.trim(), "\n##" + link);
            // Insert the data in the scrapedData db
            // db.scrapedData.insert({
            //   title: title,
            //   link: link
            // },
            // function(err, inserted) {
            //   if (err) {
            //     // Log the error if one is encountered dusring the query
            //     console.log(err);
            //   }
            //   else {
            //     // Otherwise, log the inserted data
            //     console.log(inserted);
            //   }
            // });
        }
    });
});