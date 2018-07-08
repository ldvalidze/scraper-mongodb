const express = require('express');
const router  = express.Router();

const fetch_controller = require('../controllers/fetch');
const headline_controllers = require('../controllers/headline');
const note_controller = require('../controllers/note');

router.get("/api/fetch", fetch_controller.fetchHeadlines);

router.get("/api/clear", headline_controllers.clearHeadlines);

router.get("/api/headlines", headline_controllers.displayAllHeadlines);

router.get("/api/headlines/:id", headline_controllers.displayOneHeadline);

router.post("/api/headlines/:id", note_controller.addNote);

module.exports = router;