const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chatname : {type:String},
    users :[{type: mongoose.Schema.Types.ObjectId ,ref:"User"}],
    latestMessage :{type:mongoose.Schema.Types.ObjectId , ref:"Message"}
})

const chatModel = mongoose.model("Chat",chatSchema)

module.exports = chatModel