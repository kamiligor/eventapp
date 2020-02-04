import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import event from './routes/event.route'
import mongoose from 'mongoose'

const app = express()

// Set up mongoose connection
const devDbUrl = 'mongodb+srv://bh_dev:GpjbKQEUu8cDzgFV@cluster0-hu2oi.mongodb.net/test?retryWrites=true&w=majority'
const mongoDB = process.env.MONGODB_URI || devDbUrl
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/events', event)

const port = 1234

app.listen(port, () => {
  console.log('Server is up and running on port ' + port)
})
