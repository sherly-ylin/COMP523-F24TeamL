import { Request, Response } from 'express'
import { User } from '../models/userSchema.js'


export const allAccess = (_: Request, res: Response) => {
  res.status(200).send('Public Content.')
}

export const userBoard = (_: Request, res: Response) => {
  res.status(200).send('User Content.')
}

export const adminBoard = (_: Request, res: Response) => {
  res.status(200).send('Admin Content.')
}
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName } = req.body;

    // Add a type guard to check if user exists
    if (!req.body.user || !req.body.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = req.body.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.username = username;
    user.firstname = firstName;
    user.lastname = lastName;
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Error updating profile' })
  }
}