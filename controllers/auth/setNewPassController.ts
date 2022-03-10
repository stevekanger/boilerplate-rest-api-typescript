import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

const setNewPassController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    const { email } = (await jwt.verify(
      token,
      `${process.env.JWT_SECRET_VERIFICATION}`
    )) as { email: string }

    const user = await User.findOne({ email: email })

    if (!user)
      return res
        .status(400)
        .json({ msg: 'Cannot find user with email of ' + email })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    user.password = hash
    user.verificationToken = null
    user.save()

    return res
      .status(200)
      .json({ msg: 'New password saved you may now log in' })
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error and we could not save your new password',
    })
  }
}

export default setNewPassController
