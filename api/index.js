import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

//app.use(express.json())  good habit for APIs

app.use('/api/user', userRoutes)

app.listen(3000, () => {
  console.log('server is running on port 3000 !!')
})
