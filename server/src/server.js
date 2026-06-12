// Server entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const resourceRoutes = require("./routes/resourceRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/resources", resourceRoutes);

app.get('/', (req, res) => {
  res.send('Skoolify API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});