// import React from 'react'
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.postQuestion(questionData)
    dispatch({type: "POST_QUESTION", payload:data})
    dispatch(fetchQuestions())
    navigate('/')
    return data
  } catch (error) {
    return error.response.data
  }
}

export const fetchQuestions = () => async (dispatch)  =>{
  try {

    const {data} = await api.getAllQuestions()
    dispatch({type: "FETCH_ALL_QUESTIONS", payload:data})
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const {_id ,noOfAnswers, answerBody, userAnswered, userId} = answerData;
    const {data} = await api.postAnswer(_id ,noOfAnswers, answerBody, userAnswered, userId)
    dispatch({type:'POST_ANSWER',payload: data})
    dispatch(fetchQuestions())
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestion = (_id, navigate) => async (dispatch) => {
  try {
    const {data} = api.deleteQuestion(_id)
    dispatch(fetchQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)    
  }
}

export const deleteAnswer = (_id, answerId, noOfAnswers) => async (dispatch) =>{
  try {
    const {data} = await api.deleteAnswer(_id, answerId, noOfAnswers)
    dispatch(fetchQuestions())
  } catch (error) {
    console.log(error) 
  }
}


export const voteQuestion = (_id, value, userId) => async (dispatch) =>{
  try {
    const {data} = api.voteQuestion(_id, value, userId)
    console.log('data:',data)
    dispatch(fetchQuestions())
  } catch (error) {
    console.log(error)
  }
}