import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { User } from '../models/userSchema.js'
import { environment } from '../../environment.js'
import {
  createUserFromDB,
  getUserByIdFromDB,
  getUserProfileByIdFromDB,
  getAllUsersFromDB,
  updateUserFromDB,
  deleteUserFromDB,
} from '../services/userService';

/* Useless */
// export const allAccess = (_: Request, res: Response) => {
//   res.status(200).send('Public Content.')
// }

// export const userBoard = (_: Request, res: Response) => {
//   res.status(200).send('User Content.')
// }

// export const adminBoard = (_: Request, res: Response) => {
//   res.status(200).send('Admin Content.')
// }

export const createUser = async (req: Request, res: Response) => {
  try {
      const user = await createUserFromDB(req.body);
      res.status(201).json(user); // Password is already excluded
  } catch (error: any) {
      res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log('userController req.userid: ', req.params.userId);
      const user = await getUserProfileByIdFromDB(req.params.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      console.log('gotuser:', user)
      res.status(200).json(user);

  } catch (error: any) {
      res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
      const users = await getAllUsersFromDB();
      res.status(200).json(users);
  } catch (error: any) {
      res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
      const user = await updateUserFromDB(req.params.userId, req.body);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error: any) {
      res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
      const user = await deleteUserFromDB(req.params.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
      res.status(400).json({ message: error.message });
  }
};

// export const getUserProfile = async (req: Request, res: Response) => {
//   try {
//     // Check if the request has the token in the Authorization header
//     const token = req.headers['authorization']?.split(' ')[1]
    
//     if (!token) {
//       return res.status(403).json({ message: 'No token provided' })
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, config.secret) as { id: string }
    
//     // Find the user using the decoded token's user ID
//     const user = await User.findById(decoded.id)

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }

//     // Respond with the user profile data
//     const userProfile: any = {
//       id: user._id,
//       username: user.username,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       role: user.role,
//       team_name: null
//     }
    
//     if (user.role === 'provider') {
//       userProfile.team_name = user.team_name
//     }

//     environment.currentId = user.id
//     environment.currentUsername = user.username
//     environment.currentFirstName = user.first_name
//     environment.currentLastName = user.last_name
//     environment.currentEmail = user.email
//     environment.currentUserRole = user.role

//     res.status(200).json(userProfile)
//   } catch (err) {
//     console.error('Error retrieving user profile:', err)
//     return res.status(500).json({ message: 'Internal Server Error' })
//   }
// }

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const { username, first_name, last_name } = req.body;


//     return res.status(200).json({ message: 'Profile updated successfully'})
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return res.status(500).json({ message: 'Error updating profile' })
//   }
// }