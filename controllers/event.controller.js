const Event = require('../models/event.model');
const { check, validationResult } = require('express-validator');
const { isValidDate } = require('../helpers');


exports.status = function (req, res) {
  res.send('Successfully connected to server.');
};

exports.event_create_validation = [
  check('email')
    .not().isEmpty().withMessage('Email is required.').bail()
    .isEmail().withMessage('Email is invalid.').bail()
    .isLength({max: 320}).withMessage('Email is too long.').bail()
    .normalizeEmail(),

  check('firstName')
    .not().isEmpty().withMessage('First name is required.').bail()
    .isString().withMessage('Something went wrong.').bail()
    .trim()
    .escape()
    .isLength({max: 100}).withMessage('First name is too long.').bail(),

  check('lastName')
    .not().isEmpty().withMessage('Last name is required.').bail()
    .isString().withMessage('Something went wrong.').bail()
    .trim()
    .escape()
    .isLength({max: 100}).withMessage('Last name is too long.').bail(),

  check('eventDate')
    .not().isEmpty().withMessage('Event date is required.').bail()
    .custom(isValidDate).withMessage('Event date is invalid.').bail()
];

exports.event_create = function(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send(errors);
  }
  
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
    res.send('Event updated succesfully.');
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