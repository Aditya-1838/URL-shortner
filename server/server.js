require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

const indexRouter = require('./routes/index')

const PORT = process.env.PORT || 5000

// ✅ List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL // Make sure this is set in Render!
]

// ✅ CORS middleware with debug logging
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      console.log("Blocked by CORS: ", origin)
      return callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200
}))

app.use(express.json())

app.get('/test', (req, res) => {
  res.send('test route')
})

app.use('/', indexRouter)

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('✅ Database connection successful'))
.catch((err) => console.log('❌ Database error:', err))

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
