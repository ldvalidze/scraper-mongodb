const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// const db = require("./models");
const PORT = 3001;
const app = express();
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "home" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// require('./routes')(app);
const api_routes = require('./routes/api');
app.use(api_routes);

const view_routes = require('./routes/view');
app.use(view_routes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost:27017/scrapeAndComment");

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  