var express = require('express');
var router = express.Router();
const User  = require("../db/models").User
const jwt = require("jsonwebtoken");
const config = require("./../config/database.js")
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/validateUser")

/* GET users listing. */
/* router.post('/', async(req,res)=> {
  try{
    console.log(req)
    const result = await User.create({ name : req.body.name, 
      email: req.body.email, password: req.body.password})
    return res.status(200).send("User created successfully")
  }
  catch(err){
    return res.status(400).send(err)
  }
  
}); */
router.post("/signup",signupValidation, async (req, res) => {
  try{
    let user = await User.findOne({where : { email: req.body.email }});
    if (user) return res.status(400).send("User with given Email already exist");
    user = await User.build({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    });
    console.log(user.password)
    user.password = await user.generateHashedPassword(user.password);
    await user.save();
    let token = jwt.sign(
      { id: user.id },
      config.jwtPrivateKey
    );
    console.log("token",token)
    let dataToReturn ={
      name: user.name,
      email : user.email,
      token : token
    }
    return res.status(200).send(dataToReturn);
  }
  catch(err){
    return res.status(400).send(err)
  }
});
  router.post("/login", loginValidation, async (req, res) => {
  try{
    let user = await User.findOne({where :{ email: req.body.email }});
    if (!user) return res.status(400).send("User Not Registered");
    let isValid = await user.verifyPassword(req.body.password, user.password);
    console.log("is valid",isValid)
    
    if (!isValid){
      return res.status(401).send("Invalid Password");
      
    } 
    let token = jwt.sign(
      { id: user.id},
      config.jwtPrivateKey
    );
    return res.status(200).send(token);
  }
  catch(err){
    console.log(err)
    return res.status(400).send("Error")
  }
});
router.get('/', async(req,res)=> {
  try{
    const results = await User.findAll()
    console.log(config.jwtPrivateKey)
    return res.status(200).send(results)
  }
  catch(err){
    return res.status(400).send(err)
  }
});


module.exports = router;
