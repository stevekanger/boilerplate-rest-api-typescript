import { Request, Response } from 'express'

const homeController = (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'You made it to the home page!',
  })
}

export default homeController
