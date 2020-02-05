import mongoose from 'mongoose'

const devDbUrl = 'mongodb+srv://bh_dev:GpjbKQEUu8cDzgFV@cluster0-hu2oi.mongodb.net/dev?retryWrites=true&w=majority'
const mongoDB = process.env.MONGODB_URI || devDbUrl
mongoose.connect(mongoDB)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db
