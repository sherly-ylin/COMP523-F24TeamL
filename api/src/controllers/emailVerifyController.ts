import nodemailer from 'nodemailer'
import config from '../config.js' // Assuming environment variables are stored here
import { IInvite } from '../models/inviteSchema.js'
import { IEmailVerification } from '../models/emailVerificationSchema.js'

// Create a reusable transporter outside the function to avoid repeated initialization
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.email_username, // Your Gmail address from the config
    pass: config.email_password, // Your Gmail App Password
  },
})

export const sendEmail = async (invite: IInvite) => {
  console.log(`Sending email to: ${invite.email}`)

  // Construct the mail options
  const mailOptions = {
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: invite.email,
    subject: `Invitation to Join the eIPS Fidelity Project as a ${invite.role}!`,
    html: `
      <p>Welcome to the eIPS Fidelity Project!</p>
      <p>Press <a href="http://localhost:4200/signup/${invite.token}">here</a> to sign up as a ${invite.role}!</p>
      <p>This link expires at ${invite.expiresAt}</p>
    `,
  }

  try {
    // Send email using the pre-configured transporter
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    // Handle error appropriately, could rethrow or log to a monitoring service
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export const sendEmailVerificationCode = async (emailVerification: IEmailVerification) => {
  const mailOptions = {
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: emailVerification.email,
    subject: `Code: ${emailVerification.verificationCode} - eIPS Reset Password`,
    html: `
      <p>Don't share this code with anyone. Your verification code for resetting eIPS password is ${emailVerification.verificationCode}.</p>
      <p>This code expires in 15 minutes.<\p>
      <p>If you didn't request this code, then someone has entered your username or email on eIPS reset password page at ${emailVerification.createdAt}.</p>
      <p>Don't need to worry, they don't know your password. You can safely ignore this email.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error('Failed to send verification email')
  }
}