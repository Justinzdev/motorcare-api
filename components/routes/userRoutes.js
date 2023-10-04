const userRoutes = require('express').Router()
const userControllers = require('../controllers/userControllers')

userRoutes.get('/getuser/:user_username/:user_email/:user_phone', userControllers.getUsers)
userRoutes.post('/signup', userControllers.userSignup)
userRoutes.post('/signin', userControllers.userSignin)

module.exports = userRoutes