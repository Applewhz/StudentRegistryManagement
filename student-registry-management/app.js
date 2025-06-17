const mysql = require("mysql");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.MYSQL_PORT;

const middleware = (req, res, next) => {
   req.requestMethod = req.method;
   req.requestURL = req.url;
   res.data = res.data;
   res.header("Content-Type", "application/json;charset=UTF-8");
   res.header("Access-Control-Allow-Credentials", true);
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
};

app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// Importing all routes

const routes = require("./routes/routes");

app.use("/api/v1", routes);

app.listen(PORT, () => {
   console.log(
      `Server Started on Port ${process.env.MYSQL_PORT} in ${process.env.NODE_ENV} mode`
   );
});

app.all("*", (req, res) => {
   return res.json({
      code: "403",
      Message: "Invalid URL",
   });
});

module.exports = app;
