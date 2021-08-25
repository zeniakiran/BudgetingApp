var express = require('express');
var router = express.Router();
const Group  = require("../db/models").Expense

/* GET users listing. */
router.post('/', async(req,res)=> {
  try{
    console.log(req)
    const result = await Expense.create({name : req.body.name})
    return res.status(200).send("Expense added successfully")
  }
  catch(err){
    return res.status(400).send(err)
  }
  
});
router.get('/', async(req,res)=> {
  try{
    const results = await Expense.findAll()
    return res.status(200).send(results)
  }
  catch(err){
    return res.status(400).send(err)
  }
});


module.exports = router;
