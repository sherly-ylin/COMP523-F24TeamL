import cors from 'cors'
import express from 'express'

import * as db from './database'
import routes from './routes/index'

/* Creating an express app on port 8080 */
const app = express()
const port = 3000

/* Initializing cors */
var corsOptions = {
  origin: 'http://localhost:4200',
}

app.use(cors(corsOptions))

/* Allowing express to use jsons */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.connect()
db.initialize()

app.use('/', routes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
