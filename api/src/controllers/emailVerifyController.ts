import nodemailer from 'nodemailer'
import config from '../config'

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
    html: `Press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email. Thanks`,
  }

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Message sent')
    }
  })
  // let info = Transport.sendMail({
  //     from: '"User" <recruiting@learneryou.com>',
  //     to: "ly1339@nyu.edu",
  //     subject: "Hello",
  //     text: "Hello world?",
  //     html: "<b>Hello world?</b>",
  //   });

  //   console.log("Message sent: %s", info.messageId);
}
