// Score routes
const express = require('express');
const router = express.Router();

const {
    createScore,
    getScores
} = require("../controllers/scoreController");

router.post("/", createScore);
router.get("/", getScores);


module.exports = router;
