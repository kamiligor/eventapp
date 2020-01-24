const Event = require('../models/event.model');

// Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send('Greetings from the Test controller!');
};

exports.event_create = function(req, res) {
  let event = new Event(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      eventDate: req.body.eventDate
    }
  );

  event.save(function(err) {
    if(err) {
      return next(err);
    }
    res.send('Event saved successfully.')
  })

}

exports.event_details = function(req, res) {
  Event.findById(req.params.id, function(err, event) {
    if(err) {
      return next(err);
    }
    res.send(event);
  })
}

exports.event_update = function(req, res) {
  Event.findByIdAndUpdate(req.params.id, {$set: req.body},
  function(err, event) {
    if(err) {
      return next(err);
    }
    res.send('Event updated.');
  })
}


exports.event_delete = function(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      return next(err);
    }
    res.send('Event deleted successfully.');
  })
}