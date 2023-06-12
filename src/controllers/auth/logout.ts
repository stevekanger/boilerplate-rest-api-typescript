import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'

export default async function logout(req: Request, res: Response) {
  try {
    const authToken = req.cookies.refreshToken

    const { _id } = jwt.verify(
      authToken as string,
      process.env.JWT_SECRET as string
    ) as { _id: string }

    const user = await User.findOne({ _id })

    if (!user)
      return res.status(400).json({
        success: false,
        msg: 'Bad request',
      })

    res.clearCookie('refreshToken')
    user.authToken = ''
    user.save()

    return res.status(200).json({
      success: true,
      msg: 'You have been successfully logged out',
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Bad request',
    })
  }
}
