const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const dotenv = require("dotenv");
const mongoDB = require("./app/utils/mongodb.util");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

async function startServer() {
  try {
    await mongoDB.connect();
    const PORT = config.app.port;

    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } catch (error) {
    console.log("Cannot connect to database", error);
    process.exit(1);
  }
}

startServer();
