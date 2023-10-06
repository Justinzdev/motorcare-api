const notificationRoutes = require('express').Router()
const notificationControllers = require('../controllers/notificationControllers')

notificationRoutes.get('/:user_id', notificationControllers.getNotification)

module.exports = notificationRoutes