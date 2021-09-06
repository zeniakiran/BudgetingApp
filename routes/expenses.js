var express = require('express');
var router = express.Router();
const Expense  = require("../db/models").Expense
const { expenseValidation} = require("../middlewares/validateExpense")

/* GET users listing. */
router.post('/',expenseValidation, async(req,res)=> {
  try{
    console.log(req)
    const result = await Expense.create({amount : req.body.amount, type: req.body.type,
    description: req.body.description, created_by: req.body.created_by,
    group_id: req.body.group_id})
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
