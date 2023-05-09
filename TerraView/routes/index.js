const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
    res.render("index")
})

module.exports = router;
