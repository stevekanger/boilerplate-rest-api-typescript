import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../helpers/createTokens'

const tokensController = async (req: Request, res: Response) => {
  try {
    if (!req.cookies.R_TOKEN) return res.sendStatus(401)

    jwt.verify(req.cookies.R_TOKEN, `${process.env.JWT_SECRET_REFRESH}`)

    const { accessToken, accessTokenExp } = createAccessToken(res)

    return res.status(200).json({
      accessToken,
      accessTokenExp,
      msg: 'New tokens created successfully',
    })
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default tokensController
