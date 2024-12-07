import { Request, Response } from 'express'
import { Error } from 'mongoose'
import { IUser, User } from '../models/userSchema.js'

export const getUserInfo = (req: Request, res: Response) => {
  const email = req.query.email
  User.find({ user_email: email }, (err: Error, result: Array<IUser>) => {
    if (err) {
      console.error(err)
      return
    } else {
      res.json({
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
      })
    }
  })
}
