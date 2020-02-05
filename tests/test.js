import '@babel/polyfill'
import app from '../src/app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const request = supertest(app)

describe('event routes', () => {
  beforeAll(() => {
    const mongoDB = process.env.DB_URI
    mongoose.connect(mongoDB)
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })

  it('should get status endpoint', async done => {
    const res = await request.get('/events/status')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Successfully connected to server.')

    done()
  })

  it('should crud event', async (done) => {
    const event = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jak.kowalski@example.com',
      eventDate: '01/01/2021'
    }
    const tempData = {}

    let res = await request.post('/events/create').send(event)
    expect(res.status).toBe(200)

    tempData.id = res.body.id

    res = await request.get('/events/' + tempData.id)
    expect(res.status).toBe(200)

    res = await request.put('/events/' + tempData.id + '/update')
    expect(res.status).toBe(200)

    res = await request.delete('/events/' + tempData.id + '/delete')
    expect(res.status).toBe(200)

    done()
  })
})
