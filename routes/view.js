const express = require('express');
const router  = express.Router();

router.get("/", function(req,res) {
    res.render('home', {
        layout: 'main'
    });
});

router.get("/saved", function(req,res) {
    res.render('saved', {
        layout: 'main'
    });
});

module.exports = router;