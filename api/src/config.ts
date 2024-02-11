import dotenv from 'dotenv'

dotenv.config()
const username = process.env.EMAIL_USERNAME
const password = process.env.EMAIL_PASSWORD

export default {
  email_username: username,
  email_password: password,

  secret: 'ips-fidelity',
  mongodbUri:
    //     "mongodb+srv://ac22:thebeast@thebeastdatabase.dfi9k2p.mongodb.net/thebeast?retryWrites=true&w=majority"
    /* mongodb+srv://<user>:<pass>@<database-name>.dfi9k2p.mongodb.net/thebeast?retryWrites=true&w=majority */
    'mongodb://localhost:27017', //for use localhost testing on windows
}
