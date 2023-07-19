import { Int32 } from 'mongodb'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now()},
    questionsToday:{type:Number, default:0},
    lastQuestion:{type: Date},
    plan:[{
        planName: String,
        amount:Number,
        noOfQuestions:Number,
        startedOn:{type:Date},
        validTill:{type: Date}
    }],
})
userSchema.plugin(uniqueValidator)
export default mongoose.model("User", userSchema)