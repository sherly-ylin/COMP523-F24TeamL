import nodemailer from 'nodemailer'
import config from '../config.js'
import { v4 as uuidv4 } from 'uuid'

// export const randString = () => {
//   const len = 8
//   let randStr = ''
//   for (let i = 0; i < len; i++) {
//     // Random number between 1 and 10
//     const ch = Math.floor(Math.random() * 10 + 1)
//     randStr += ch
//   }
//   return randStr
// }

export const randString = (): string => uuidv4().replace(/-/g, '').slice(0, 10);

export const sendEmail = (email: any, uniqueString: string) => {
  console.log(email)
  let Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_username, // your Gmail address
      pass: config.email_password, // your App Password
    },
  })
  //   var mailOptions;
  //   let sender = "LearnerYou_Email_Verification";
  let mailOptions = {
    from: '"Ruthvika Kosuri" <ruthvika.kosuri@gmail.com>',
    // from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: email,
    subject: 'Verify your email address',
    html: `Press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email. Thanks.`,
  }

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Message sent')
    }
  })
}


export const sendInviteSuperadminEmail = (email: any) => {
  const uniqueString = randString()
  console.log(email)
  let Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_username, // your Gmail address
      pass: config.email_password, // your App Password
    },
  })
  //   var mailOptions;
  //   let sender = "LearnerYou_Email_Verification";
  let mailOptions = {
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: email,
    subject: 'You are invited to join the eIPS Fidelity Project as a superadmin',
    html: `Press <a href=http://localhost:4200/signup/${uniqueString}> here </a> to sign up as a superadmin. Thanks.`,
  }

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Invite Email Sent')
    }
  })
}

export const sendInviteAdminEmail = (email: any) => {
  const uniqueString = randString()
  console.log(email)
  let Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_username, // your Gmail addrgit ess
      pass: config.email_password, // your App Password
    },
  })
  //   var mailOptions;
  //   let sender = "LearnerYou_Email_Verification";
  let mailOptions = {
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: email,
    subject: 'You are invited to join the eIPS Fidelity Project as an admin',
    html: `Press <a href=http://localhost:4200/signup/${uniqueString}> here </a> to sign up as an admin. Thanks.`,
  }

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Invite Email Sent')
    }
  })
}

export const sendInviteProviderEmail = (email: any) => {
  const uniqueString = randString()
  console.log(email)
  let Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_username, // your Gmail address
      pass: config.email_password, // your App Password
    },
  })
  //   var mailOptions;
  //   let sender = "LearnerYou_Email_Verification";
  let mailOptions = {
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
    to: email,
    subject: 'You are invited to join the eIPS Fidelity Project as a provider',
    html: `Press <a href=http://localhost:4200/signup/${uniqueString}> here </a> to sign up as a provider. Thanks.`,
  }

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Invite Email Sent')
    }
  })
}