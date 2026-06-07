require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");

// ADD THIS LINE
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");

const app = express();

app.use(cors());
app.use(express.json());

// ADD THIS LINE
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);

app.get("/", (req, res) => {
  res.send("Zepnest API Running");
});
app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });
});
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});