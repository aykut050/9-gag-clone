const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DislikeSchema = new mongoose.Schema({
    userId : { type : Schema.Types.ObjectId, ref:'User'},
    postId : { type : Schema.Types.ObjectId, ref:'Post'},
    date : { type : Date},
    definition : { type : String },
    postImage : { type : String, required : true },
    category : { type: Schema.Types.ObjectId, ref:'Category' },

})

module.exports = mongoose.model('Dislike', DislikeSchema)