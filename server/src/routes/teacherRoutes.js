// Teacher routes
const express = require('express');
const router = express.Router();

const Teacher = require("../models/Teacher");

router.post("/", async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get("/", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


module.exports = router;
