import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Document, Error } from 'mongoose'

import config from '../config.js'
import { Role } from '../models/roleSchema.js'
import { User } from '../models/userSchema.js'
import * as verify from './emailVerifyController.js'
import { environment } from '../../environment.js'

export const signup = (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    user_email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verified: false,
    user_fname: '',
    user_lname: '',
    uniqueString: verify.randString(),
    role: req.body.role,
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<Document>) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
            // Send the email verification
            verify.sendEmail(req.body.email, user.uniqueString ?? '')

            // Once everything is done, send a success message
            res.status(200).send({
              message:
                'User was registered successfully! Please check your email to verify your account.',
            })
          })
        },
      )
    } else {
      // If no roles are specified, just save the user and send the email
      verify.sendEmail(req.body.email, user.uniqueString ?? '')

      // Send a success message
      res.status(200).send({
        message:
          'User was registered successfully! Please check your email to verify your account.',
      })
    }
  })
}

export const signIn = (req: Request, res: Response) => {
  environment.user_email = req.body.email

  User.findOne({
    user_email: req.body.email,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password ?? '',
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      if (!user.verified) {
        return res.status(401).send({
          accessToken: null,
          message: 'Email not verified. Please check your inbox!',
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      })

      var authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].toString())
      }
      res.status(200).send({
        uid: user._id,
        username: user.username,
        email: user.user_email,
        roles: authorities,
        accessToken: token,
      })
      console.log('username')
    })
}

export const invite = async (req: Request, res: Response) => {
  var signed_in_user = await User.findOne(
    { user_email: environment.user_email },
    (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Found ' + doc)
        } else {
          console.log(
            'Could not find user with email: ' + environment.user_email,
          )
        }
      }
    },
  ).clone()

  if (signed_in_user != null && (signed_in_user.role != 'superadmin')) {
    res.status(500).send({ message: `You are a ${signed_in_user.role}, not a superadmin, so you can't invite other users.` })
    return;
  }

  const user = new User({
    user_email: req.body.email,
    verified: false,
    uniqueString: verify.randString(),
    role: req.body.role,
  })

  // Send the email verification
  if (user.role == 'superadmin') {
    verify.sendInviteSuperadminEmail(req.body.email);
  } else if (user.role== 'admin') {
    verify.sendInviteAdminEmail(req.body.email);
  } else {
    verify.sendInviteProviderEmail(req.body.email);
  }
  
  // Once everything is done, send a success message
  res.status(200).send({
    message:
      'Successfully sent invite email',
  });
}

export const signupSuperadmin = (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    user_email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verified: false,
    user_fname: '',
    user_lname: '',
    uniqueString: verify.randString(),
    role: 'superadmin'
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<Document>) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
            // Send the email verification
            verify.sendEmail(req.body.email, user.uniqueString ?? '')

            // Once everything is done, send a success message
            res.status(200).send({
              message:
                'User was registered successfully! Please check your email to verify your account.',
            })
          })
        },
      )
    } else {
      // If no roles are specified, just save the user and send the email
      verify.sendEmail(req.body.email, user.uniqueString ?? '')

      // Send a success message
      res.status(200).send({
        message:
          'User was registered successfully! Please check your email to verify your account.',
      })
    }
  })
}

export const signupAdmin = (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    user_email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verified: false,
    user_fname: '',
    user_lname: '',
    uniqueString: verify.randString(),
    role: 'admin'
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<Document>) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
            // Send the email verification
            verify.sendEmail(req.body.email, user.uniqueString ?? '')

            // Once everything is done, send a success message
            res.status(200).send({
              message:
                'User was registered successfully! Please check your email to verify your account.',
            })
          })
        },
      )
    } else {
      // If no roles are specified, just save the user and send the email
      verify.sendEmail(req.body.email, user.uniqueString ?? '')

      // Send a success message
      res.status(200).send({
        message:
          'User was registered successfully! Please check your email to verify your account.',
      })
    }
  })
}

export const signupProvider = (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    user_email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verified: false,
    user_fname: '',
    user_lname: '',
    uniqueString: verify.randString(),
    role: 'provider'
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<Document>) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
            // Send the email verification
            verify.sendEmail(req.body.email, user.uniqueString ?? '')

            // Once everything is done, send a success message
            res.status(200).send({
              message:
                'User was registered successfully! Please check your email to verify your account.',
            })
          })
        },
      )
    } else {
      // If no roles are specified, just save the user and send the email
      verify.sendEmail(req.body.email, user.uniqueString ?? '')

      // Send a success message
      res.status(200).send({
        message:
          'User was registered successfully! Please check your email to verify your account.',
      })
    }
  })
}