var express = require('express');
var router = express.Router();
const User  = require("../db/models").User

/* GET users listing. */
router.post('/', async(req,res)=> {
  try{
    console.log(req)
    const result = await User.create({ firstName: req.body.firstName, lastName: req.body.lastName, 
      email: req.body.email })
    //console.log("Jane's auto-generated ID:", jane.id);
    /* let newUser= new User();
    newUser.firstName= req.body.firstName;
    newUser.lastName= req.body.lastName;
    newUser.email= req.body.email;
    
    await newUser.save(); */
    return res.status(200).send("User created successfully")
  }
  catch(err){
    return res.status(400).send(err)
  }
  
});
router.get('/', async(req,res)=> {
  try{
    const results = await User.findAll()
    return res.status(200).send(results)
  }
  catch(err){
    return res.status(400).send(err)
  }
});


module.exports = router;
