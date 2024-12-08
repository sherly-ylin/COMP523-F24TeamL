import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import { Team } from './models/teamSchema.js'
import { User } from './models/userSchema.js'
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

async function insertUsers() {
  try {
    // Insert fake data
    const users = [
      {
        username: 'provider1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'provider1@example.com',
        password: 'provider1',
        role: 'provider',
        team_id: 'team001',
      },
      {
        username: 'admin1',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'admin1@example.com',
        password: 'admin1',
        role: 'admin',
      },
      {
        username: 'superadmin',
        first_name: 'Penny',
        last_name: 'Lyles',
        email: 'superadmin@example.com',
        password: 'super',
        role: 'superadmin',
      },
    ]

    await User.insertMany(users)
    console.log('Database seeded successfully!')
    console.log('You can log in using one of the following accounts:', users)
  } catch (err) {
    console.error('Error inserting initial users:', err)
    process.exit(1)
  }
}
async function insertTeams() {
  try {
    // Insert fake data
    const teams = [
      {
        team_id: 'alpha',
        team_name: 'Team Alpha',
        user_ids: [],
      },
      {
        team_id: 'beta',
        team_name: 'Team Beta',
        user_ids: [],
      },
    ]

    let inserted = await Team.insertMany(teams)
    console.log('teams:', inserted)
  } catch (err) {
    console.error('Error inserting initial teams:', err)
    process.exit(1)
  }
}

async function seedDatabase() {
  try {
    await mongoose.connection.db.dropDatabase()
    insertTeams()
    insertUsers()
  } catch (err) {
    console.error('Error seeding database:', err)
    process.exit(1)
  }
}
// Main
;(async () => {
  await connectToDatabase()
  await startServer()
  await seedDatabase()
})()
