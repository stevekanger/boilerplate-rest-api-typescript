import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const tokensController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.get('Authorization')
    const currentRefreshToken = authHeader && authHeader?.split(' ')[1]

    jwt.verify(
      currentRefreshToken as string,
      process.env.JWT_REFRESH_SECRET as string
    )

    const accessToken = jwt.sign({}, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: process.env.JWT_ACCESS_LIFESPAN,
    })

    const refreshToken = jwt.sign(
      {},
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: process.env.JWT_REFRESH_LIFESPAN,
      }
    )

    return res.status(200).json({
      accessToken,
      refreshToken,
      msg: 'New tokens created successfully',
    })
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default tokensController
