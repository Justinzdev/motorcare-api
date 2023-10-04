const bikeRepairRoutes = require('express').Router()
const bikeRepairControllers = require('../controllers/bikeRepairControllers')

bikeRepairRoutes.get('/getstores', bikeRepairControllers.getStores)

module.exports = bikeRepairRoutes