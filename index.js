require('dotenv').config()
const express = require('express')
const cors = require('cors')

// require('./components/services/schedule')

const api = express()
const port = process.env.PORT || 4000

const userRoute = require('./components/routes/userRoutes')
const bikeRepairRoute = require('./components/routes/bikeRepairRoutes')
const damageRoute = require('./components/routes/damageRoutes')
const notificationRoute = require('./components/routes/notificationRoutes')

const corsOptions = {
    origin: '*',
    credential: true,
    methods: "GET, POST, DELETE"
}

api.use(cors(corsOptions))
api.use(express.json({ limit: '50mb' }))
api.use(express.urlencoded({ extended: true }))

// API
api.use('/api/user', userRoute)
api.use('/api/bikerepair', bikeRepairRoute)
api.use('/api/damage', damageRoute)
api.use('/api/notification', notificationRoute)

api.listen(port, console.log(`API is running on port ${port}`))