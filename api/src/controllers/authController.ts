import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Error, Types } from 'mongoose'

import crypto from 'crypto'
import { environment } from '../../environment.js'
import config from '../config.js'
import { Invite } from '../models/inviteSchema.js'
import { User } from '../models/userSchema.js'
import * as verify from './emailVerifyController.js'
import * as userService from '../services/userService.js'

export async function getInvite(req: Request, res: Response) {
  try {
    // Search for a document with the specified token
    const invite = await Invite.findOne({ token: req.params.token })

    if (!invite) {
      // If no invite is found, send a 404 error
      return res.status(404).json({ message: 'Invite not found' })
    }

    return res.status(200).json(invite)
  } catch (err) {
    console.error('Error checking invite:', err)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err })
  }
}

export const signUp = async (req: Request, res: Response) => {
  if (!req.body.token || !req.body.password) {
    console.log("Invite token or password is null.")
    return res.status(400).json({ error: 'Invite token or password is null.' })
  }
  try {
    const invite = await Invite.findOne({ token: req.body.token })
    console.log(req.body.token)
    if (!invite) {
      console.log("Invite token is invalid.")
      return res.status(400).json({ error: 'Invite token is invalid.' })
    }

    if (invite.role == 'provider') {
      const user = new User({
        email: invite.email,
        role: invite.role,
        team_id: Types.ObjectId,
        team_name: String,
        username: req.body.username ?? invite.email,
        password: bcrypt.hashSync(req.body.password, 8),
      })
    }
    // Save the new user
    const user = new User({
      email: invite.email,
      role: invite.role,
      username: req.body.username ?? invite.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    await user.save()

    // Return success response
    res.status(200).send({ message: 'User was registered successfully!' })
  } catch (err) {
    console.log('Error saving user.')
    res.status(500).send({ message: 'Error saving user.', error: err })
  }
}


export const signIn = async (req: Request, res: Response) => {
    try {
        // Check for missing username or password
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Username or password is null.' });
        }

        // Fetch user from the database
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Compare passwords
        const isMatchCorrect = await user.comparePassword(password);
        if (!isMatchCorrect) {
            return res.status(401).send({ message: 'Invalid password.' });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        })
        const responseData: any = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          accessToken: token,
          first_name: user.first_name,
          last_name: user.last_name,
        }
        
        return res.status(200).send(responseData);
    } catch (error) {
        console.error('Error during sign-in:', error);
        return res.status(500).send({ message: 'Internal server error.' });
    }
};

function generateSecureRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

function getRandomInt(min: number, max: number): number {
  // min, max inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function generateUniqueInviteToken() {
  let token, existingDoc

  // Keep generating a new token until it is unique
  do {
    token = generateSecureRandomString(getRandomInt(32, 64))
    existingDoc = await Invite.findOne({ token })
  } while (existingDoc)

  return token
}

export const invite = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.role || !req.body.timespan) {
    return res.status(400).send({
      message:
        'Invite email address, invite role, or invitation timespan is null.',
    })
  }
  try {
    // Fetch the current user based on username
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'No user token provided' })
    }
    const decoded = jwt.verify(token, config.secret) as { id: string }

    console.log('The person sending invite:', decoded)
    const sender = await User.findById(decoded.id)
    

    // Check if the signed-in user exists and has the correct role (superadmin)
    if (!sender) {
      console.log(
        'The invite sender is not logged in. Userid:',
        decoded.id,
      )
      return res
        .status(404)
        .send({ message: 'The invite sender is not logged in.' })
    }
    if (sender.role !== 'superadmin') {
      return res.status(403).send({
        message: `You are a ${sender.role}, not a superadmin, so you can't invite other users.`,
      })
    }

    const { value, unit } = req.body.timespan
    let daysToAdd = value
    // Calculate the duration in milliseconds based on the unit
    switch (unit) {
      case 'day':
        break
      case 'week':
        daysToAdd *= 7
        break
      case 'month':
        daysToAdd *= 30
        break
      case 'year':
        daysToAdd *= 365
        break
      default:
        throw new Error('Invalid timespan unit')
    }
    // Calculate the expiration date by adding the duration to the current time
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + daysToAdd)
    expiresAt.setHours(23, 59, 59, 999) // set at midnight

    // Create the new invitation
    const invite = new Invite({
      email: req.body.email,
      role: req.body.role,
      token: await generateUniqueInviteToken(),
      timespan: req.body.timespan,
      expiresAt: expiresAt,
      inviter: sender._id,
    })
    await invite.save()

    // Send the corresponding invitation email based on the user's role
    await verify.sendEmail(invite)

    // Send a success response
    return res.status(200).send({
      message: 'Successfully sent invite email.',
    })
  } catch (err) {
    // Handle any unexpected errors
    console.error('Error during sending invite email:', err)
    return res
      .status(500)
      .send({ message: 'Error during sending invite email.' })
  }
}
export const changePassword = async (req: Request, res: Response) => {
  if (!req.body.current_password || !req.body.new_password) {
    return res.status(400).send({
      message: 'Current password or new password is null.',
    })
  }

  try {
    const user = await User.findOne({
      username: environment.currentUsername,
    })

    if (!user) {
      return res.status(404).send({
        message: 'User Not found.',
      })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.current_password,
      user.password,
    )

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Current password is incorrect!',
      })
    }

    const hashedNewPassword = bcrypt.hashSync(req.body.new_password, 8)

    user.password = hashedNewPassword
    await user.save()

    res.status(200).send({
      message: 'Password changed successfully!',
    })
  } catch (err) {
    console.error('Error during password change:', err)
    res.status(500).send({
      message: 'Error during password change.',
      error: err,
    })
  }
}
