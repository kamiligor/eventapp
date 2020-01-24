const express = require('express');
const router = express.Router();

// Require the controllers
const event_controller = require('../controllers/event.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', event_controller.test);

router.post('/create', event_controller.event_create);

router.get('/:id', event_controller.event_details);

router.put('/:id/update', event_controller.event_update);

router.delete('/:id/delete', event_controller.event_delete);

module.exports = router;