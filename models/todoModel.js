const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true, 
      },
      userId: {
        type: String,
        required: true,
        
       
      },

     
})

module.exports=mongoose.model('todo',todoSchema)