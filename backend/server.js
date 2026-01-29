const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();        // load .env variables
connectDB();            // connect MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/ai", require("./routes/aiRoutes")); // 👈 THIS ONE


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
