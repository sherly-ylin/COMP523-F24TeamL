import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import Counter from './models/counterSchema'
import { Team } from './models/teamSchema.js'
import { User } from './models/userSchema.js'
import routes from './routes/index.js'
import { createTeam } from './services/teamServices.js'
import { createUser } from './services/userService.js'

async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.mongodbUri)
    console.log('Connected to the database!')
    // await initializeCounter()
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
    const users = [
      {
        username: 'provider1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'provider1@example.com',
        password: 'provider1',
        role: 'provider',
        team_id: '1',
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
        last_name: 'Liles',
        email: 'superadmin@example.com',
        password: 'super',
        role: 'superadmin',
      },
    ]

    for (const userData of users) {
      const user = await createUser(userData)
    }

    console.log('User inserted successfully!')
    console.log('You can log in using one of the following accounts:', users)
  } catch (err) {
    console.error('Error inserting initial users:', err)
    process.exit(1)
  }
}
async function insertTeams() {
  const existingCounter = await Counter.findById('team_id')
  if (!existingCounter) {
    console.log('no existingCounter')
    await Counter.create({ _id: 'team_id', seq: 0 })
  }

  try {
    const teams = [
      {
        team_name: 'Team Alpha',
        user_ids: [],
      },
      {
        team_name: 'Team Beta',
        user_ids: [],
      },
    ]

    for (const teamData of teams) {
      console.log('inserting:', teamData)
      const team = await createTeam(teamData);
      console.log('team inserted:', team)
    }
  } catch (err) {
    console.error('Error inserting initial teams:', err)
    process.exit(1)
  }
}

async function seedDatabase() {
  try {
    await mongoose.connection.db.dropDatabase()
    await initializeCounter()
    await insertTeams()
    await insertUsers()
  } catch (err) {
    console.error('Error seeding database:', err)
    process.exit(1)
  }
}


async function initializeCounter() {
  // Initialize the counter for team_id
  try {
    const existingCounter = await Counter.findById('team_id')
    if (!existingCounter) {
      await Counter.create({ _id: 'team_id', seq: 0 })
      console.log('Initialized team_id counter.')
    }
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

// Main
;(async () => {
  await connectToDatabase()
  await seedDatabase()
  await startServer()
})()
