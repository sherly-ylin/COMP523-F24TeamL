import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { User } from '../models/userSchema.js'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  if (Array.isArray(token)) {
    token = token[0]
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.params.userId =
      typeof decoded === 'string' ? JSON.parse(decoded).id : decoded?.id
    next()
  })
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (user?.role != 'superadmin') {
      res.status(403).send({ message: 'Require Admin Role!' })
      return
    }

    next()
    return
  })
}