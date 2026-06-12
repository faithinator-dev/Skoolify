// Score controller logic
const Score = require("../models/Score");

const getGrades = (total) => {
    if (total >= 90) return "A";
    if (total >= 80) return "B";
    if (total >= 70) return "C";
    if (total >= 60) return "D";
    return "F";
}

exports.createScore = async (req, res) => {
    try {
        const { testScore, examScore } = req.body;

        const total = testScore + examScore;
        const grade = getGrades(total);

        const score = await Score.create({
            ...req.body,
            total,
            grade
        });

        res.status(201).json(score);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getScores = async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};