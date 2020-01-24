const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
  firstName: {type: String, required: true, max: 100},
  eventDate: {type: String, required: true}
});

//Export the model
module.exports = mongoose.model('Event', EventSchema);