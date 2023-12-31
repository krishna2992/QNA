import React, {useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'

import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'


const QuestionDetails = () => {
    const { id } = useParams()
    const questionList = useSelector((state) => state.questionsReducer)
    const [Answer, setAnswer] = useState('')
    const User = useSelector((state)=> state.currentUserReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'
    const handlePosAns = (e, answerLength) =>{
      e.preventDefault()
      if (User === null){
        alert('Login or SignUp to answer a question')
        navigate('/Auth')
      }else{
        if (Answer === ''){
          alert('Enter an answer before submitting')
        }else{
          
          dispatch(postAnswer({ _id:id, noOfAnswers: answerLength, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id}))
          const ele = document.getElementById('answerarea')
          ele.value = ''
        }
      }
    }

    const handleQShare = () =>{
      copy(url+location.pathname)
      alert('Link copied to clipboard', url+location.pathname);
    }

    const handleDelete = () =>{
      dispatch(deleteQuestion(id, navigate))
    }

    const handleUpvote = () =>{
      if (User !== null)
      {
        console.log('Request for upVote')
        dispatch(voteQuestion(id, 'upVote', User?.result?._id))
      }
    }
    const handleDownvote = () =>{
      if (User !== null)
      {
        console.log('Request for upVote')
        dispatch(voteQuestion(id, 'downVote', User?.result?._id))
      }
      
    }
  return (
    <div className='question-details-page'>
        {
            questionList?.data === null?<h1>Loading...</h1>:
            <>
            {
                
                questionList?.data.filter(question => question?._id === id).map(question => (
                  
                    <div key={question._id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className="question-votes">
                                    <img src={upvote} alt='upvote' width='18' onClick={handleUpvote}/>
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src={downvote} alt='downvote' width='18' onClick={handleDownvote}/>
                                </div>
                                <div style={{width: "100%"}}>
                                    <p className='question-body'>{question.questionBody}</p>
                                    <div className="question-details-tags">
                                      {
                                        question.questionTags.map((tag) => (
                                          <p key={tag}>{tag} </p>
                                        ))
                                      }
                                    </div>
                                    <div className='question-action-user'>
                                      <div>
                                        
                                        <button type='button' onClick={handleQShare}>Share</button>
                                        {
                                          User?.result?._id === question?.userId &&(
                                              <button type='button' onClick={handleDelete}>Delete</button>
                                          )
                                        }
                                        
                                      </div>
                                      <div >
                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                        <Link to={`/User/${question.userId}`} className='user-link' style={{color: "#0086d8"}}>
                                          <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                          <div>
                                            {
                                              question.userPosted
                                            }
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {
                          question.noOfAnswers !== 0 && (
                            <section>
                              <h3>{question.noOfAnswers} answers</h3>
                              <DisplayAnswer key={question?._id} question={question} handleShare={handleQShare}/>
                            </section>
                          )
                          
                        }
                        <section className='post-ans-container'> 
                          <h3>Your Answer</h3>
                          <form onSubmit={(e) => {handlePosAns(e, question.answer.length)}}>
                            <textarea id='answerarea' cols='30' rows='10' onChange={(e) => setAnswer(e.target.value)}></textarea><br/>
                            <input type="submit" className='post-ans-btn' value='Post Your Answer'/>
                          </form>
                          <p>Browse other question tagged
                            {
                              question.questionTags.map((tag) =>(
                                <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                              ))
                            } or 
                            <Link to='/AskQuestion' style={{textDecoration: 'none', color: '#009dff'}}>ask your question.</Link>
                          </p>
                        </section>
                    </div>
                ))
            }
            </>
        }      
    </div>
  )
}

export default QuestionDetails
