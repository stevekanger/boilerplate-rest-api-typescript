import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'

export default async function emailVerificationController(
  req: Request,
  res: Response
) {
  try {
    const authHeader = req.get('Authorization')
    const verificationToken = authHeader && authHeader?.split(' ')[1]

    const { _id } = jwt.verify(
      verificationToken as string,
      process.env.JWT_SECRET as string
    ) as { _id: string }

    const user = await User.findOne({ _id })

    if (!user)
      return res.status(400).json({
        success: false,
        msg: 'Bad request',
      })

    user.verified = true
    user.save()

    return res.status(200).json({
      success: true,
      msg: 'Your account has been activated you may now login',
    })
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    })
  }
}
