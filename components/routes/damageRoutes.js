const damageRoutes = require('express').Router()
const damageControllers = require('../controllers/damageControllers')

damageRoutes.post('/add', damageControllers.addDamage)
damageRoutes.patch('/cancel/:dm_id/:bp_id', damageControllers.cancelJob)
damageRoutes.patch('/confirm/:dm_id/:bp_id', damageControllers.confirmJob)

module.exports = damageRoutes