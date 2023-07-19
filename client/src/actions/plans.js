import * as api from '../api'
import { fetchAllUsers } from './users.js';

export const getAllplans = () => async (dispatch)=>{
    try {
        const {data} = await api.getAllPlans();

        dispatch({type: "PLANS", payload:data})
    } catch (error) {
        // console.log(error)
    }
}

export const createOrder = (plan) => async (dispatch) =>{
    try {
        const data = await api.createUserOrder(plan);
        return {status:1, data:data};
    } catch (error) {
        // console.log('error:', error.message)
        return {status:0, data:error.message}
    }
}

export const checkPayment = (paymentData) => async (dispatch) =>{
    try {
        const data = await api.checkUserPayment(paymentData)
        dispatch(fetchAllUsers())
        return {status:1, message:data.data.message}
    } catch (error) {
        console.log(error)
        return {status:0, message:error.message}
    }
}
 
export default getAllplans;