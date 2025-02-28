const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log("error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running at port: ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
