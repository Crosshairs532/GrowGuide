import nodemailer from 'nodemailer'
import configFiles from '../../config'
const sendEmail = async (
  userEmail: string,
  subject: string,
  link: string,
  name: string,
) => {
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
    text: `
    Hi ${name}!
    
    Click On the Link To Reset Password - ${link}`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    // Send error response to client
    console.error('Error sending email:', error)
  }
}

export default sendEmail
