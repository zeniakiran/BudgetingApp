require('dotenv').config()
var createError = require("http-errors");
var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();

const server = require("http").createServer(app);
const Sequelize = require('sequelize')
var usersRouter = require('./routes/users');
const db = require("./db/models");
db.sequelize.sync();

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next){
  next(createError(404));
});

const port = process.env.PORT || 5000; 


const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', process.env.PASSWORD, {
  host: "localhost",
  port: process.env.DB_PORT,
  dialect: 'postgres',
})
sequelize.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);


module.exports = app;
