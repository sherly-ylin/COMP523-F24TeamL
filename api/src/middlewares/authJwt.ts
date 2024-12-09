import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { User } from '../models/userSchema.js'

export const authVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, config.secret)
    req.params.userId =
      typeof decoded === 'string' ? JSON.parse(decoded).id : decoded?.id
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const isSuperadmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (user?.role != 'superadmin') {
      res.status(403).send({ message: 'Require Superadmin Role!' })
      return
    }

    next()
    return
  })
}
