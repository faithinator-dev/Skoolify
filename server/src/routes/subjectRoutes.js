// Subject routes
const express = require('express');
const router = express.Router();

const Subject = require("../models/Subject");

router.post("/", async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
