import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js' // Default import!
import courseRoutes from './routes/courseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
dotenv.config()
const app = express()
app.use(express.json())

async function databaseConnection() {
    try {
      await  mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("database connected"))
            .catch(err => console.log(err.message))
    } catch (error) {
        console.log(error)
    }
}

databaseConnection()

app.use('/api/v1/user', userRoutes) 
app.use('/api/v1/admin', userRoutes) 
app.use('/api/v1/course', adminRoutes) 

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
