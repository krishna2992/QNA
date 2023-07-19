import {createServerOrder, verifyPayment} from "../middleware/razorpay.js"
import { addUserPlan } from "./users.js"
const planList = [
    {
        planName: "Basic",
        amount:1,
        noOfQuestions:5,
        validity:28
    },
    {
        planName: "Premium",
        amount:1,
        noOfQuestions:0xFFFFFFFF,
        validity:84
    }
]

export const user_plans = (req, res) =>{
     
    try {
        res.status(200).json(planList)    
    } catch (error) {
        console.log(error.message)
    }
    
}

const isValidPlan = (ourPlan, userPlan)=>{
    return (ourPlan.planName === userPlan.planName) &&
            (ourPlan.amount === userPlan.amount) && 
            (ourPlan.noOfQuestions === userPlan.noOfQuestions) && 
            (ourPlan.amount === userPlan.amount)

}

const getPlanByName = (planName) =>{
    const plan  = planList.filter((plan) => plan.planName === planName)
    if( !plan){
        return null;
    }
    return plan[0];
}



export const getOrder = async (req, res) =>{
    const userPlan = req.body;
    const ourPlan = getPlanByName(userPlan.planName)
    
    if (!ourPlan){
        return res.status(400).json({message:"Plan Not Found"})    
    }
    
    if(!isValidPlan(ourPlan, userPlan)){
        return res.status(400).json({message:"Plan Not Found"})
    }
    const result = await createServerOrder(ourPlan.amount)
    
    if(!result.status)
    {
        res.status(400).json({message:result.payload.message})    
    }
    // await addUserPlan(ourPlan)
    res.status(200).json({amount:result.payload.amount, order_id:result.payload.order_id, currency: result.payload.currency})

}

export const checkandUpdateUser = async(req, res) =>{
    
    const {orderCreationId,razorpayPaymentId,razorpayOrderId,razorpaySignature,userId, planName} = req.body;
    
    const {status, message} = await verifyPayment({orderCreationId, razorpayPaymentId, razorpaySignature})
    
    if(!status)
    {
        return res.status(400).json({message:message})
    }
    const ourPlan = getPlanByName(planName)
    addUserPlan(ourPlan, userId)
    return res.status(200).json({message:message})
}
