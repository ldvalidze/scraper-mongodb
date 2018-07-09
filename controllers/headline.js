const db = require('../models');

exports.displayAllHeadlines = function (req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({})
    .then(function (dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.displaySavedHeadlines = function (req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({ saved: true })
    .then(function (dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.displayUnsavedHeadlines = function (req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({ saved: false })
    .then(function (dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.clearHeadlines = function (req, res) {
  // Grab every document in the Articles collection
  db.Headline.deleteMany({})
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

  db.Note.deleteMany({}).catch(function (err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
};

exports.displayOneHeadline = function (req, res) {
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbHeadline) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbHeadline);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.saveHeadline = function (req, res) {
  db.Headline.updateOne(
    { _id: req.params.id },
    { $set: { "saved": true } }
  )
    .catch(function (err) {
      res.json(err);
    });
};

exports.unsaveHeadline = function (req, res) {
  db.Headline.updateOne(
    { _id: req.params.id },
    { $set: { "saved": false } }
  )
    .catch(function (err) {
      res.json(err);
    });
};