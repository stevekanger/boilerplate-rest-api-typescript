import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    const accessToken = authHeader?.split(' ')[1]

    jwt.verify(accessToken as string, `${process.env.JWT_SECRET_ACCESS}`)

    next()
  } catch (e) {
    return res.status(401).json({
      msg: 'Invalid access token',
    })
  }
}

export default checkAuth
