import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { User } from '../models/userSchema.js'
import { environment } from '../../environment.js'

/* Useless */
export const allAccess = (_: Request, res: Response) => {
  res.status(200).send('Public Content.')
}

export const userBoard = (_: Request, res: Response) => {
  res.status(200).send('User Content.')
}

export const adminBoard = (_: Request, res: Response) => {
  res.status(200).send('Admin Content.')
}


export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Check if the request has the token in the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' })
    }

    // Verify the token
    const decoded = jwt.verify(token, config.secret) as { id: string }
    
    // Find the user using the decoded token's user ID
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the user profile data
    const userProfile: any = {
      id: user._id,
      first_name: user.firstname,
      last_name: user.lastname,
      username: environment.currentUsername,
      email: user.email,
      role: environment.currentUserRole,
      team_name: null
    }
    //should i save this in the env too?
    if (environment.currentUserRole === 'provider') {
      userProfile.team_name = user.team_name
    }

    res.status(200).json(userProfile)
  } catch (err) {
    console.error('Error retrieving user profile:', err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
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