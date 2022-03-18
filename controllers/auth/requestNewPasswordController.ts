import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import sendEmail from '../../utils/sendEmail'
import User from '../../models/User'

const requestNewPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) return res.sendStatus(400)

    const user = await User.findOne({ email })

    if (!user) return res.sendStatus(400)

    const verificationToken = jwt.sign({ _id: user._id }, user.password, {
      expiresIn: process.env.EMAIL_VERIFICATION_TIMESPAN,
    })

    await sendEmail({
      from: '"Security" <noreply@example.com>',
      to: email,
      subject: 'Password Change Request',
      html: `You have requested to change your password. Please follow the link below.<br>
       <a href="http://localhost:3000/set-new-password?token=${verificationToken}">Change Password</a>`,
    })

    return res.status(200).json({
      msg: `An email was sent to ${email} please check your email for verification`,
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export default requestNewPasswordController
