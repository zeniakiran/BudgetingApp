var express = require('express');
var router = express.Router();
const Group  = require("../db/models").Group
const { groupValidation } = require("../middlewares/validateGroup")

/* GET users listing. */
router.post('/',groupValidation, async(req,res)=> {
  try{
    const result = await Group.create({name : req.body.name})
    return res.status(200).send("Group created successfully")
  }
  catch(err){
    return res.status(400).send(err)
  }
  
});
router.get('/', async(req,res)=> {
  try{
    const results = await Group.findAll()
    return res.status(200).send(results)
  }
  catch(err){
    return res.status(400).send(err)
  }
});


module.exports = router;
