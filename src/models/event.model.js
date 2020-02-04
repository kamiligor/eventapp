import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  firstName: {type: String, required: true, max: 100},
  lastName: {type: String, required: true, max: 100},
  email: {type: String, required: true, max: 320},
  eventDate: {type: Date, required: true}
});

const eventModel = mongoose.model('Event', EventSchema)

export default eventModel