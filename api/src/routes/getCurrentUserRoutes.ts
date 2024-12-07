import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Error } from 'mongoose'
import config from '../config.js'
import { IUser, User } from '../models/userSchema.js'

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
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          email: result[0].email,
        })
      }
    }
  })
}
