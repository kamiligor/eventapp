const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
  firstName: {type: String, required: true, max: 100},
  lastName: {type: String, required: true, max: 100},
  email: {type: String, required: true, max: 320},
  eventDate: {type: Date, required: true}
});

module.exports = mongoose.model('Event', EventSchema);