import express from 'express'
import bodyParser from 'body-parser'
import event from './routes/event.route'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/events', event)
export default app
