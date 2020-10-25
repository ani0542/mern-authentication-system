const express=require('express')
const router=express.Router()
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const auth=require('../middleware/auth')


router.get('/test',(req,res)=>{
    res.send('sab thik to hai na ')
})


router.post('/register',async (req,res)=>{
    try{
        let { email, password, passwordCheck, displayName } = req.body;
          //validate

        if (!email || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "The password needs to be at least 5 characters long." });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ msg: "Enter the same password twice for verification." });
              //checking if the user exists with the same email or not
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });

          if (!displayName) 
          {
            displayName = email;
          }

            //hashing the password

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            console.log(passwordHash)

            //save the user into the database
            const newUser = new User({
                email:email,
                password: passwordHash,
                displayName:displayName,
              });

              const savedUser = await newUser.save();
              res.json(savedUser);
    }
    catch(err)
    {
        res.status(500).json({ error: err.message });
    }

})





//////////////////////sign in/////////////////

router.post('/login',async (req,res)=>{
    try{
           const{email,password}=req.body;
           //validate

           if (!email || !password)
           return res.status(400).json({ msg: "Not all fields have been entered." });

           const user = await User.findOne({ email: email });
           if (!user)
             return res
               .status(400)
               .json({ msg: "No account with this email has been registered." });

               const isMatch = await bcrypt.compare(password, user.password);
               if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });


              //create token


              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
              res.json({
                token,
                user12: {
                  id: user._id,
                  displayName: user.displayName,
                  // email:user.email
                },
              });

    }
    catch(err)
   {
       res.status(500).json({ error: err.message });
   }


  
})




//delete account


//u can delete ur account only if u r logged in

router.delete('/delete',auth,async(req,res)=>{
  try {
          const deletedUser = await User.findByIdAndDelete(req.user12);
          res.json(deletedUser);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }    
          console.log(req.user12)
})


router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 




router.get('/',auth,async(req,res)=>{
  const user= await User.findById(req.user12)
  res.json({
    displayName:user.displayName,
    id:user._id
  })
})
  
module.exports=router;