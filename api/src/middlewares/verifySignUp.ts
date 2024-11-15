import { NextFunction, Request, Response } from 'express'
import { Invite } from '../models/inviteSchema.js'
import { Role } from '../models/roleSchema.js'
import { User } from '../models/userSchema.js'

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invite = await Invite.findOne({ token: req.body.token })

    // Combine both checks into a single query using `$or`
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: invite?.email }],
    })

    if (user) {
      // Check which field is causing the conflict
      if (user.username === req.body.username) {
        return res
          .status(400)
          .send({ message: 'Failed! Username is already in use!' })
      }

      if (user.email === req.body.email) {
        return res
          .status(400)
          .send({ message: 'Failed! This email is already in use!' })
      }
    }

    // No duplicate username or email found, proceed to the next middleware
    next()
  } catch (err) {
    // Handle errors gracefully
    res.status(500).send({
      message: 'An error occurred while checking for duplicates',
      error: err,
    })
  }
}

export const checkRolesExisted = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.roles) {
      // Query all requested roles at once using `$in`
      const roles = await Role.find({ name: { $in: req.body.roles } })

      // Create a set of existing role names for easy lookup
      const existingRoles = new Set(roles.map((role) => role.name))

      // Check if all the roles in the request body exist
      for (const role of req.body.roles) {
        if (!existingRoles.has(role)) {
          return res.status(400).send({
            message: `Failed! Role ${role} does not exist!`,
          })
        }
      }
    }

    // If no roles are provided, or all roles exist, continue to the next middleware
    next()
  } catch (err) {
    res
      .status(500)
      .send({ message: 'An error occurred while checking roles', error: err })
  }
}
