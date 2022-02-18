const router = require("express").Router();
const User = require("../models/user")


//REGISTER
router.get("/register", async (req,res)=>{
    const user = await new User({
        name:'amal',
        email:"amalsabu@gmail.com",
        password:"12345"
    })

    await user.save()
    res.send("done")
})

module.exports = router