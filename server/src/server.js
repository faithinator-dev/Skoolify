// Server entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require("./routes/studentRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/students", studentRoutes);

app.get('/', (req, res) => {
  res.send('Skoolify API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});