const userRoutes = require('express').Router()
const userControllers = require('../controllers/userControllers')

userRoutes.post('/signup', userControllers.userSignup)
userRoutes.post('/signin', userControllers.userSignin)
userRoutes.patch('/updatelocation', userControllers.updateLocation)

module.exports = userRoutes