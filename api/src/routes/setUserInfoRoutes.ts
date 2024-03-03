import { Request, Response } from 'express'
import { User } from '../models/userSchema.js'

export const setUserInfo = async (req: Request, res: Response) => {
  const email = req.body.email
  const user = await User.findOne({ user_email: email })
  if (user) {
    const filter = { user_email: email }
    const replacementDocument = {
      $set: {
        user_fame: req.body.firstName,
        user_lname: req.body.lastName,
      },
    }
    const result = await User.updateOne(filter, replacementDocument)
    res.json({ message: 'Successfully updated info' })
  } else {
    res.json('User not found')
  }
}
