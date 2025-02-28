const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log("error:", error));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running at port: ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
