import mongoose from 'mongoose'
import dbConfig from './db.config'
import { Role } from './models/roleSchema'

mongoose.Promise = global.Promise

export const connect = () => {
  mongoose
    .connect(dbConfig.url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the database!')
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err)
      process.exit()
    })
}

// Initialize database
export const initialize = () => {
  Role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}

const db = {}
// db.mongoose = mongoose
// db.url = dbConfig.url
// db.personLevel = personLevelSchema(mongoose)
// db.closed = closedSchema(mongoose)
// db.staffing = staffingSchema(mongoose)
// db.jobDev = jobDevModel
// db.IPSLog = IPSLogSchema(mongoose)
// db.user = userSchema(mongoose)
// db.roles = roleSchema(mongoose)
module.exports = db
