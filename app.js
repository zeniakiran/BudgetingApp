const express = require("express");
const app = express();
const pool = require("./db");
app.use(express.json());
app.listen(5000, () => {
  console.log("app listening on port 5000");
});
