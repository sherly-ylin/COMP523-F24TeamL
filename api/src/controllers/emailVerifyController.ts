import nodemailer from 'nodemailer'
import config from '../config.js'

export const randString = () => {
  const len = 8
  let randStr = ''
  for (let i = 0; i < len; i++) {
    // Random number between 1 and 10
    const ch = Math.floor(Math.random() * 10 + 1)
    randStr += ch
  }
  return randStr
}

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
    from: '"UNC Department of Psychiatry" <hello@psychiatry.unc.edu>',
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
    html: `Press <a href=http://localhost:4200/zmY4KHGcqMKPjEsewQTE2QbazONxITTjSHGP2sA> here </a> to sign up as a superadmin. Thanks.`,
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
    subject: 'You are invited to join the eIPS Fidelity Project as an admin',
    html: `Press <a href=http://localhost:4200/dmfde3YDsBZKsNEnzLo9Q> here </a> to sign up as an admin. Thanks.`,
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
    html: `Press <a href=http://localhost:4200/9be6A5Vv7HVV0ojFI4Izfw> here </a> to sign up as a provider. Thanks.`,
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