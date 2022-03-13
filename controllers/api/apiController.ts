import { Request, Response } from 'express'

const apiController = (req: Request, res: Response) => {
  res.status(200).json({
    msg: `You have access to the api`,
  })
}

export default apiController
