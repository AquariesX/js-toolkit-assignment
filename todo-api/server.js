require("dotenv").config({ quiet: true });

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = process.env.CLIENT_URL
  ? {
      origin: process.env.CLIENT_URL.split(",").map((origin) => origin.trim()),
      credentials: true
    }
  : {};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Secure To-Do API is running",
    data: null
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API health check passed",
    data: {
      uptime: process.uptime(),
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Closing HTTP server and MongoDB connection.`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
}

module.exports = app;
