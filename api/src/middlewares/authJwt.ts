import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { DecodedToken } from '../types/DecodedToken';

import config from '../config.js'
import { Role } from '../models/roleSchema.js'
import { User } from '../models/userSchema.js'

export const verifyJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid or expired token!' })
    }
    req.user = decoded;
    next()
  })
}
