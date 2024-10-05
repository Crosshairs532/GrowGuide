import nodemailer from 'nodemailer'
import configFiles from '../../config'
const sendEmail = (userEmail: string, subject: string, link: string) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configFiles.sender_email,
      pass: configFiles.sender_password,
    },
  })

  var mailOptions = {
    from: configFiles.sender_email,
    to: userEmail,
    subject: subject,
    text: `Click On the Link To Reset Password - ${link}`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export default sendEmail
