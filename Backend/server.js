const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log("DB connection error:", error));

// Use process.env.PORT for Render
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running at port: ${PORT}...`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
