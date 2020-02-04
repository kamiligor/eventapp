import Event from '../models/event.model'
import { check, validationResult } from 'express-validator'
import { isValidDate } from '../helpers'


export const status = (req, res) => {
  res.send('Successfully connected to server.');
};

export const event_create_validation = [
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

export const event_create = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send(errors);
  }
  
  const event = new Event(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      eventDate: req.body.eventDate
    }
  );

  event.save(err => {
    if(err) {
      return next(err);
    }
    res.send('Event saved successfully.')
  })

}

export const event_details = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if(err) {
      return next(err);
    }
    res.send(event);
  })
}

export const event_update = (req, res) => {
  Event.findByIdAndUpdate(req.params.id, {$set: req.body},
  err => {
    if(err) {
      return next(err);
    }
    res.send('Event updated succesfully.');
  })
}


export const event_delete = (req, res) => {
  Event.findByIdAndRemove(req.params.id, err => {
    if(err) {
      return next(err);
    }
    res.send('Event deleted successfully.');
  })
}