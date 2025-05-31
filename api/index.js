import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/user.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'

const app = express()

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_COMPASS_URI)
        console.log('Connected to MongoDB.')
    } catch (err) {
        throw err
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('MongoDB Disconnected.')
})

// MIDDLEWARES
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

// err HANDLING
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 500
    return res.status(errorStatus).json(errorMessage)
})

app.listen(8800, () => {
    connect()
    console.log('Connected to Backend.')
})
