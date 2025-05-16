require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

const indexRouter = require('./routes/index')

const PORT = process.env.PORT || 5000

// Set up CORS options to allow only your frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // e.g. https://your-frontend.vercel.app
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/test', (req, res) => {
    res.send('test route')
})

app.use('/', indexRouter)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Database connection successfull'))
.catch((err) => console.log('error in db connection', err))

app.listen(PORT, () => { 
  console.log(`Server running on ${PORT}`) 
})
