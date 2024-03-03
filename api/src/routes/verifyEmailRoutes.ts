import { NextFunction, Request, Response } from 'express'
import { User } from '../models/userSchema.js'

export const verifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
}

export const getUniqueString = async (req: Request, res: Response) => {
  const { uniqueString } = req.params
  const user = await User.findOne({ uniqueString: uniqueString })
  if (user) {
    user.verified = true
    const filter = { uniqueString: uniqueString }
    const replacementDocument = {
      $set: {
        verified: true,
      },
    }
    const result = await User.updateOne(filter, replacementDocument)
    res.redirect('/verified')
  } else {
    res.json('User not found')
  }
}
