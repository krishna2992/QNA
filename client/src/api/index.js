import axios from 'axios'

const api = axios.create({baseURL:'http://localhost:5000'})

api.interceptors.request.use((req) =>{
    if(localStorage.getItem("Profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => api.post('/user/login', authData)
export const signUp = (authData) => api.post('/user/signup', authData)
export const postQuestion = (questionData) => api.post('/questions/Ask', questionData)
export const getAllQuestions = () => api.get('/questions/get')
export const postAnswer = (_id, noOfAnswers, answerBody, userAnswered, userId) => api.patch(`/answer/post/${_id}`, {noOfAnswers, answerBody, userAnswered, userId})
export const deleteQuestion = (_id) => api.delete(`/questions/delete/${_id}`)
export const deleteAnswer = (_id, answerId, noOfAnswers) => api.patch(`/answer/delete/${_id}`, {answerId, noOfAnswers})
export const voteQuestion = (_id, value, userId) => api.patch(`/questions/vote/${_id}`, {value, userId}) 

export const getAllUsers = () => api.get('/user/getAllUsers')
export const updateProfile = (id, updateData) =>api.patch(`/user/update/${id}`, updateData);
export const getAllPlans = () => api.get('/plans/get')
export const createUserOrder = (plan) => api.post('/plans/payment/orders', plan)
export const checkUserPayment = (paymentData) => api.post('/plans/payment/success', paymentData)
export default api