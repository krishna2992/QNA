import React from 'react'
import moment from 'moment'
import '../../App.css'
import '../../components/HomeMainbar/HomeMainbar.css'
import { Link } from 'react-router-dom'


const Questions = ({question}) => {
    return (
        <div className='display-question-container'>
            <div className='display-votes-ans'>
                <p>{question.upVote.length - question.downVote.length} </p>
                <p>votes</p>
            </div>
            <div className='display-votes-ans'>
                <p>{question.noOfAnswers} </p>
                <p>Answers</p>
            </div>
            <div className="display-question-details">
                <Link className='question-title-link' to={`/Questions/${question?._id}`}>{question?.questionTitle}</Link>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {
                            question.questionTags?.map((tag) =>(
                                <p key={tag} id={tag}>{tag}</p>
                            ))
                        }
                    </div>
                    <p className='display-time'>
                        asked {moment(question.askedOn).fromNow()} {question.userPosted}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Questions