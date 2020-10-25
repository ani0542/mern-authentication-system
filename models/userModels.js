const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
       
      },


      password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [5, 'Minimum password length is 5 characters'],
      },
      
      displayName:{
          type:String
      }
})

module.exports=mongoose.model('User',userSchema)