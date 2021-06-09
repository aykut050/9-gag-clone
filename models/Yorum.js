const mongoose = require('mongoose')
const Schema = mongoose.Schema

const YorumSchema = new mongoose.Schema({
    userId : { type : Schema.Types.ObjectId, ref:'Post'},
    userName : { type : String, ref:'User' }, 
    postId : { type : Schema.Types.ObjectId, ref:'Post'},
    date : { type : Date, default : Date.now},
    definition : { type : String },
    userPostImage :  { type : String }
})

module.exports = mongoose.model('Yorum', YorumSchema)