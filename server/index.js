import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import user_routes from './routes/users.js'
import question_routes from './routes/Questions.js'
import answer_routes from './routes/Answers.js'
import payment_routes from './routes/Plans.js'

const app = express()
dotenv.config();
app.use(express.json({limit: "30mb", extended:true}))
app.use(express.json());
app.use(express.urlencoded({limit: "30mb", extended:true}))
app.use(cors())



app.get('/',(req, res) =>{
    
    res.send("This is a stack overflow clone api.")
})

app.use('/user', user_routes)
app.use('/questions', question_routes)
app.use('/answer', answer_routes)
app.use('/plans', payment_routes)


app.post('auth/signup')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(` server running on port ${PORT}`)}))
    .catch((err)=>console.log(err.message))