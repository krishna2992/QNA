import React, {useState} from 'react'
import './AskQuestion.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')

    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const isEmpty = (t) =>{
        for(let i = 0; i < t.length; i++)
        {
            if(t[i] !== ' '){
                return false
            }
                
        }
        return true
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!questionTitle || isEmpty(questionTitle))
        {
            alert('Question Must Have Title')
            
        }else if(!questionBody || isEmpty(questionBody)){
            alert('Question Must Have Body')    
        }
        else if(!questionTags || isEmpty(questionTags))
        {
            alert('Question Must Have Non-empty Tags')
        }
        else{
            dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id}, navigate))
            .then((response)=>{
                alert(response)
                navigate('/')
            });    
        }
    }
    

    const handleEnter = (e) =>{
        if(e.key === 'Enter'){
            setQuestionBody(questionBody+ "\n")
        }
    } 

    return (
    <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Ask Public Question</h1>
            <form  onSubmit={handleSubmit}>
                <div className='ask-form-container'>
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you are asking to a person.</p>
                        <input type='text' onChange={(e) =>{setQuestionTitle(e.target.value)}} placeholder='e.g. Is there a function for finding a index of an element in a vector?' id='ask-ques-title'/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Include all the details for the question.</p>
                        <textarea type='text' onChange={(e) =>{setQuestionBody(e.target.value)}} rows='10' cols='30'  id='ask-ques-body' onKeyPress={handleEnter}/>
                    </label>
                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add upto 5 tags to describe what your question is about.</p>
                        <input type='text' onChange={(e) =>{setQuestionTags(e.target.value.split(' '))}}  id='ask-ques-tags'/>
                    </label>
                </div>
                <input type='submit' value='Review Your Question' className='review-btn'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
