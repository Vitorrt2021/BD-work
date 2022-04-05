require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const viewRoutes = require("./routes/viewRoutes.js");

const client = require("./dbConnection");
//Middleware
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use("/users/", userRoutes);
app.use("/address/", addressRoutes);
app.use("/view/", viewRoutes);

app.use((error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(200).json({
      statusCode: 500,
      message: "InternalServerError",
    });
  }
});

module.exports = app;
