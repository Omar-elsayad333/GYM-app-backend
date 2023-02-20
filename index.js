require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts.js')

// Express app
const app = express()
mongoose.set('strictQuery', true);

// Middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)

    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen to requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listeneing on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    }
)

// Export the Express API
module.exports = app;