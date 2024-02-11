import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Error } from 'mongoose'
import config from '../auth.config'
import { IUser, User } from '../models/userSchema'

export const getCurrentUser = (req: Request, res: Response) => {
  const userToken = req.headers.authorization ?? ''
  const token = userToken.split(' ')
  const decoded = jwt.verify(token[1], config.secret)
  var userId = typeof decoded === 'string' ? decoded : decoded.id
  User.find({ _id: userId }, (err: Error, result: Array<IUser>) => {
    if (err) {
      console.error(err)
      return
    } else {
      if (result.length > 0) {
        res.json({
          username: result[0].username,
          firstName: result[0].user_fname,
          lastName: result[0].user_lname,
          email: result[0].user_email,
        })
      }
    }
  })
}
