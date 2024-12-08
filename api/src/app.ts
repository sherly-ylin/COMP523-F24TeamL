import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import { Team } from './models/teamSchema.js'
import { User } from './models/userSchema.js'
import routes from './routes/index.js'
import bcrypt from 'bcryptjs';

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
        team_id: 'alpha',
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

    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // Triggers pre('save') middleware
  }

    console.log('User inserted successfully!')
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

    let inserted = await Team.create(teams)
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


const testPasswordHashing = async () => {
    const plainPassword = 'mypassword123';
    const wrongPassword = 'wrongpassword';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('Hashed Password:', hashedPassword);

    // Compare with correct password
    const isCorrect = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Correct Password Match:', isCorrect); // Should log true

    // Compare with incorrect password
    const isWrong = await bcrypt.compare(wrongPassword, hashedPassword);
    console.log('Wrong Password Match:', isWrong); // Should log false
};


const testComparePassword = async () => {
    try {
        // Create a new user with a plaintext password
        const user = new User({
            username: 'testuser',
            first_name: 'John',
            last_name: 'Doe',
            email: 'testuser@example.com',
            password: 'mypassword123', // Plaintext password
            role: 'admin',
        });
        await user.save();

        // Check the hashed password in the database
        console.log('Stored Password Hash:', user.password);

        // Fetch the user from the database
        const fetchedUser = await User.findOne({ email: 'testuser@example.com' });

        // Call comparePassword
        const isMatchCorrect = await fetchedUser?.comparePassword('mypassword123');
        console.log('Correct Password Match:', isMatchCorrect); // Should log true

        const isMatchIncorrect = await fetchedUser?.comparePassword('wrongpassword');
        console.log('Incorrect Password Match:', isMatchIncorrect); // Should log false
    } catch (error) {
        console.error('Error during password comparison test:', error);
    }
};


// Main
;(async () => {
  await connectToDatabase()
  await startServer()
  // testPasswordHashing();
  // await testComparePassword()
  await seedDatabase()

})()
