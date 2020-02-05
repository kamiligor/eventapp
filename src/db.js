import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoDB = process.env.DB_URI
mongoose.connect(mongoDB)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db
