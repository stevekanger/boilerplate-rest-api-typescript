import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import createToken from '../../utils/auth/createToken'
import setRefresTokenCookie from '../../utils/auth/setRefreshTokenCookie'

export default async function tokensController(req: Request, res: Response) {
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
        msg: 'User does not exist',
      })

    if (user.authToken !== authToken) {
      user.authToken = ''
      user.save()
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized',
      })
    }

    const accessToken = createToken('access', user._id)
    const refreshToken = createToken('refresh', user._id)

    setRefresTokenCookie(res, refreshToken)
    user.authToken = refreshToken
    user.save()

    return res.status(200).json({
      success: true,
      accessToken,
      msg: 'New tokens created successfully',
    })
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    })
  }
}
