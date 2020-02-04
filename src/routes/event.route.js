const express = require('express');
const router = express.Router();
const controller = require('../controllers/event.controller');

router.get('/status', controller.status);

router.post('/create', controller.event_create_validation, controller.event_create);

router.get('/:id', controller.event_details);

router.put('/:id/update', controller.event_update);

router.delete('/:id/delete', controller.event_delete);

module.exports = router;