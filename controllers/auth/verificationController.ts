import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

const verificationController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    const { email } = jwt.verify(
      token,
      `${process.env.JWT_SECRET_VERIFICATION}`
    ) as { email: string }

    const user = await User.findOne({ email: email })

    if (!user)
      return res.status(401).json({
        msg: 'User not found',
      })

    if (user.verificationToken !== token)
      return res.status(400).json({ msg: "Verification tokens don't match" })

    user.verificationToken = null
    user.verified = true
    user.save()

    return res.status(200).json({
      msg: 'Your account has been activated you may now login',
    })
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error in verification',
    })
  }
}

export default verificationController
