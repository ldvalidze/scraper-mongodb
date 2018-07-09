const axios = require("axios");
const cheerio = require("cheerio");

const db = require('../models');

exports.fetchHeadlines = function (req, res) {
    console.log('fetchHeadlines called!');
    // First, we grab the body of the html with request
    axios.get("https://www.reuters.com/news/archive/technologyNews").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".news-headline-list .story").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children(".story-content").children("a").children(".story-title").text();
            result.link = 'https://www.reuters.com/' + $(this).children(".story-content").children("a").attr("href");
            result.summary = $(this).children(".story-content").children("p").text();
            result.saved = false;

            // Create a new Article using the `result` object built from scraping
            db.Headline.create(result)
                .then(function (dbHeadline) {
                    // View the added result in the console
                    console.log(dbHeadline);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    });

};