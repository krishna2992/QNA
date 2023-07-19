import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) =>{
    const _id = req.params.id;
    const { noOfAnswers, answerBody, userAnswered, userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }
    
        updateNoOfQuestions(_id, noOfAnswers+1)
        try {
            const updatedquestion= await Questions.findByIdAndUpdate(_id, {$addToSet:{'answer':{answerBody, userAnswered, userId:userId}}})
            return res.status(200).json(updatedquestion)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json(error)    
        }
    
}

const updateNoOfQuestions = async (_id, noOfAnswers) =>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteAnswer = async(req, res) => {
    const _id = req.params.id;
    
    const {answerId, noOfAnswers} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){ 
        return res.status(404).send('Answer unavailable...')
    }
    updateNoOfQuestions(_id, noOfAnswers-1)
    try {
        await Questions.updateOne(
            {_id},
            {$pull: {'answer':{_id:answerId}}}
        )
        return res.status(200).json({message: 'Successfully deleted Question...'})
    } catch (error) {
        return res.status(405).json(error)
    }
}
