require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var app = express();

const server = require("http").createServer(app);
const Sequelize = require("sequelize");
var usersRouter = require("./routes/users");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.get("/", (req, res) => res.json({ message: "Hello World" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 5000;

const sequelize = new Sequelize("budget_app", "postgres", "zeniafariha", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);

module.exports = app;
