var express = require('express');
var router = express.Router();
const UserGroup  = require("../db/models").user_groups

/* GET users listing. */
router.post('/', async(req,res)=> {
  try{
    console.log(req.body.userId,req.body.groupId)
    const result = await UserGroup.create({ userId : req.body.userId, 
      groupId: req.body.groupId})
      console.log("result",result)
    return res.status(200).send("Record added successfully")
  }
  catch(err){
    return res.status(400).send(err)
  }
  
});
router.get('/', async(req,res)=> {
  try{
    const results = await UserGroup.findAll()
    return res.status(200).send(results)
  }
  catch(err){
    return res.status(400).send(err)
  }
});


module.exports = router;
