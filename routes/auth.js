const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");


//REGISTER

router.post("/register",async(req,res) => {
    

    try{

    //generate new password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
    //create new user
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password:hashedPassword,
            
            });

    //save user return response

        const user = await newUser.save()
        res.status(200).json(user)
    } catch(err){
        response.status(500).json(err)
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");
      if(user)
      {
          const validPassword = await bcrypt.compare(req.body.password, user.password)
          !validPassword && res.status(400).json("wrong password")
          if(validPassword){
            const { password, ...others } = user._doc;
              res.status(200).json(others)
          }
      }  
         
    } catch (err) {
      res.status(500).send({message:err})
    }
  });


module.exports = router