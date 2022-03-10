import nodemailer from 'nodemailer'

const verificationMailer = async (
  email: string,
  token: string,
  path: string
) => {
  try {
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    const info = await transporter.sendMail({
      from: '"verification" <noreply@example.com>',
      to: email,
      subject: 'Verification',
      html: `Verify yourself by following the link below<br>
       <a href="http://localhost:3000/${path}?verificationToken=${token}">Verification</a><br>
       This link will be active for the next 24 hours.`,
    })

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    throw new Error('Email could not be sent to ' + email)
  }
}

export default verificationMailer
