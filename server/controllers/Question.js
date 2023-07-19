import mongoose from 'mongoose';
import Questions from '../models/Questions.js'
import users from '../models/auth.js'

const isSameDay = (d1) =>{
    const td = new Date()
    return (td.getFullYear() === d1.getFullYear()) && (td.getMonth() === d1.getMonth()) && (td.getDate() === d1.getDate())
} 

const getPlanForUserAndUpdate = async (userId)=>{
    var queT;
    var lasQ = new Date()
    try{
        const user = await users.findOne({_id: userId})
        if(!user){
            return {type:'error', message:"User Doesn't Exist"}
        }
        if(!user.plan.length){
            return {type:"error", message:"No Active Plan"};
        }
        else{
            const plans = user.plan;
            if(plans[0].validTill < new Date())
            {
                const plan_id = plans[0]._id
                console.log(plan_id)
                await user.updateOne((
                    {_id:user._id},
                    {$pull: {'plan':{planName:plans[0].planName}}}))
                return {type:"error", message:"No Active Plan"}
            }
            lasQ = user.lastQuestion;
            if(lasQ && isSameDay(lasQ)){
                queT = 1;
            }
            else{
                queT = user.questionsToday;
                if(queT >= plans[0].noOfQuestions)
                {
                    return {type:"error", message: "Daily Question Limit Exhausted"}        
                }
            }
        }
        const updated = await users.findOneAndUpdate({_id:userId},{questionsToday:queT+1, lastQuestion:lasQ}, {
            new: true});
        return {type:"success", message:'Updated Question Count'};
    }
    catch(error){
        console.log(error)
        return {type:"error", message: 'Something went wrong...'};
    }
}

export const AskQuestion = async (req, res) =>{
    const postQuestionData = req.body;
    // console.log(postQuestionData)
    const userId = postQuestionData.userId; 
    const postQuestion = new Questions({...postQuestionData})
    try {
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).send('User unavailable...')
        }
        const responce = await getPlanForUserAndUpdate(userId);
        if(responce.type === "success"){
            await postQuestion.save()
            res.status(200).json('Posted a question succesfully')
        }
        else{
            res.status(409).json(responce.message)
        }
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post the Question")
    }
}

export const getAllQuestions = async (req, res) => {
    try{
        const questionList = await Questions.find()
        return res.status(200).json(questionList)
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}
export const deleteQuestion = async (req, res)=>{
    const _id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }

    try {
        await Questions.findByIdAndRemove(_id);
        return res.status(200).json({message: 'Successfully deleted ...'})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: error.message})
    }
}

export const voteQuestion = async(req, res) =>{
    const _id = req.params.id;
    const {value, userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }
    try {
        const question = await Questions.findById(_id)
        
        const upIndex = question.upVote.findIndex((id)=> id == String(userId))
        
        const downIndex = question.downVote.findIndex((id)=> id == String(userId))
        
        if (value === 'upVote'){
            if(downIndex !== -1)
            {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
                
            }
            
            if(upIndex === -1)
            {
                question.upVote.push(userId);
                
            }
            else{
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        else if(value === 'downVote'){
            if(upIndex !== -1)
            {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if(downIndex === -1)
            {
                question.downVote.push(userId);
            }
            else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }

        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({message:"Voted Successfully..."});
    } catch (error) {
        res.status(404).json({message:"Id not found"})
    }
}