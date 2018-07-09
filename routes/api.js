const express = require('express');
const router  = express.Router();

const fetch_controller = require('../controllers/fetch');
const headline_controllers = require('../controllers/headline');
const note_controller = require('../controllers/note');

//scraping route
router.get("/api/fetch", fetch_controller.fetchHeadlines);

//headline routes
router.delete("/api/clear", headline_controllers.clearHeadlines);
router.get("/api/headlines", headline_controllers.displayAllHeadlines);
router.get("/api/headlines/saved", headline_controllers.displaySavedHeadlines);
router.get("/api/headlines/unsaved", headline_controllers.displayUnsavedHeadlines);
router.get("/api/headlines/:id", headline_controllers.displayOneHeadline);
router.put("/api/headlines/save/:id", headline_controllers.saveHeadline);
router.put("/api/headlines/unsave/:id", headline_controllers.unsaveHeadline);

//note routes
router.get("/api/notes/:id", note_controller.displayNotes);
router.post("/api/notes", note_controller.addNote);
router.delete("/api/notes/:id", note_controller.deleteNote);


module.exports = router;