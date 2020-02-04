import express from 'express'
import * as controller from '../controllers/event.controller'

const router = express.Router()

router.get('/status', controller.status)

router.post('/create', controller.eventCreateValidation, controller.eventCreate)

router.get('/:id', controller.eventDetails)

router.put('/:id/update', controller.eventUpdate)

router.delete('/:id/delete', controller.eventDelete)

export default router
