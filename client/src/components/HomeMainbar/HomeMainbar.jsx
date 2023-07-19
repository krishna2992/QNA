import React from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionList from '../../components/QuestionList/QuestionList'
import {useSelector} from 'react-redux'
const HomeMainbar = () => {
  // var questionsList = [{
  //   _id:1,
  //   upvotes:3,
  //   downvotes:2,
  //   noOfAnswers:2,
  //   QuestionTitle:"What is a function?",
  //   QuestionBody: "It meant to be",
  //   QuestionTags: ["java", "node", "reactjs", "mongodb"],
  //   userPosted: "mano",
  //   usedId: 1,
  //   askedOn:"jan 1",
  //   answer:[{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     answeredOn:"jan 2",
  //     userId: 2,
  //   }]
  // },{
  //   _id:2,
  //   upvotes:3,
  //   downvotes:2,
  //   noOfAnswers:0,
  //   QuestionTitle:"What is a function?",
  //   QuestionBody: "It meant to be",
  //   QuestionTags: ["javascript", "R", "Python"],
  //   userPosted: "sano",
  //   usedId:1,
  //   askedOn:"jan 2",
  //   answer:[{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     answeredOn:"jan 2",
  //     userId: 2,
  //   }]
  // },{
  //   _id:3,
  //   upvotes:3,
  //   downvotes:2,
  //   noOfAnswers:0,
  //   QuestionTitle:"What is a function?",
  //   QuestionBody: "It meant to be",
  //   QuestionTags: ["java", "node", "reactjs", "mongodb"],
  //   userPosted: "mano",
  //   askedOn:"jan 3"
  // }]
  
  
  const planList = useSelector((state)=> state.planReducer)
  const location = useLocation()
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()
  const check_auth = ()=>{
    if(User === null){
      alert('Login or signup to ask a question')
      navigate('/Auth')
    }
    else{
      navigate('/AskQuestion')
    }
  }
  const questionList = useSelector((state) => state.questionsReducer)
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        { location.pathname === '/'?<h1>Top questions</h1>:<h1>All Questions</h1>}
        <button className='ask-btn' onClick={check_auth} >Ask Question</button>
      </div>
      <div>
        {
          
          questionList?.data === null? <h1>Loading....</h1>:
          <>
            <p>{questionList?.data?.length} questions</p>
            <QuestionList questionList={questionList?.data}/>
          </> 
        }
      </div>
    </div>
  )
}

export default HomeMainbar
