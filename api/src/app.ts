import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import routes from './routes/index.js'

async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.mongodbUri)
    console.log('Connected to the database!')
  } catch (err) {
    console.error('Cannot connect to the database!', err)
    process.exit(1)
  }
}

async function startServer() {
  const app = express()
  const port = 3000

  // CORS Configuration
  const corsOptions = { origin: 'http://localhost:4200' }
  app.use(cors(corsOptions))

  // Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Routes
  app.use('/', routes)

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

// Main
;(async () => {
  await connectToDatabase()
  await startServer()
})()
