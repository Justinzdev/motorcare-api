const bikeRepairRoutes = require('express').Router()
const bikeRepairControllers = require('../controllers/bikeRepairControllers')

bikeRepairRoutes.get('/getstores', bikeRepairControllers.getStores)
bikeRepairRoutes.get('/getjobs/:bp_id', bikeRepairControllers.getJobs)

module.exports = bikeRepairRoutes