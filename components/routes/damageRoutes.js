const damageRoutes = require('express').Router()
const damageControllers = require('../controllers/damageControllers')

damageRoutes.post('/add', damageControllers.addDamage)

module.exports = damageRoutes