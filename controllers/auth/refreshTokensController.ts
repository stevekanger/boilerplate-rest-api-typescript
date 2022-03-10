import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {
  createAccessToken,
  createRefreshToken,
} from '../../helpers/createTokens'

const refreshTokensController = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.cookies.refreshToken, `${process.env.JWT_SECRET_REFRESH}`)

    const { accessToken, exp } = createAccessToken()
    const refreshToken = createRefreshToken()

    res.cookie('refreshToken', refreshToken, {
      path: '/auth/refresh-tokens',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
    })

    return res.status(200).json({
      accessToken,
      exp,
      msg: 'New tokens created successfully',
    })
  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid refresh token',
    })
  }
}

export default refreshTokensController
