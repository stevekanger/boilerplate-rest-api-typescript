import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.get('Authorization')
    const accessToken = authHeader?.split(' ')[1]

    jwt.verify(accessToken as string, process.env.JWT_SECRET as string)

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    })
  }
}
