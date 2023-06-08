import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import sendEmail from '../../utils/sendEmail'

const setNewPasswordController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.get('Authorization')
    const token = authHeader?.split(' ')[1] as string

    const { password } = req.body

    const { _id } = jwt.decode(token) as { _id: number }

    const user = await User.findOne({ _id })

    if (!user) return res.sendStatus(400)

    await jwt.verify(token, user.password)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    user.password = hash
    user.save()

    await sendEmail({
      from: '"Security" <noreply@example.com>',
      to: user.email,
      subject: 'Your Password Was Changed',
      html: `Your password was recently changed. If this was not you contact us immediately.`,
    })

    return res
      .status(200)
      .json({ msg: 'New password saved you may now log in' })
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export default setNewPasswordController
