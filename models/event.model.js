const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
  firstName: {type: String, required: true, max: 100},
  lastName: {type: String, required: true, max: 100},
  email: {type: String, required: true, max: 100},
  eventDate: {type: Date, required: true}
});

//Export the model
module.exports = mongoose.model('Event', EventSchema);