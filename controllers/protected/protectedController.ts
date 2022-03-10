import { Request, Response } from 'express'

const protectedController = (req: Request, res: Response) => {
  res.status(200).json({
    msg: `You have access to this protected route`,
  })
}

export default protectedController
