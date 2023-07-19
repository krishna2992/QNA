import React from 'react'
import Questions from '../../pages/Questions/Questions'

const QuestionList = ({questionList}) => {
  return (
    <>
    {
      
        questionList?.map((question)=>(
            <Questions question={question} id={question?._id} key={question?._id}/>
        ))
    }
    </>
  )
}

export default QuestionList
