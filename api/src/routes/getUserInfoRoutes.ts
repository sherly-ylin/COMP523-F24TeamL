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
        firstName: result[0].user_fname,
        lastName: result[0].user_lname,
        email: result[0].user_email,
      })
    }
  })
}
