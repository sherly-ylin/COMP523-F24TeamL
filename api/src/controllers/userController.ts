import { Request, Response } from 'express'

export const allAccess = (_: Request, res: Response) => {
  res.status(200).send('Public Content.')
}

export const userBoard = (_: Request, res: Response) => {
  res.status(200).send('User Content.')
}

export const adminBoard = (_: Request, res: Response) => {
  res.status(200).send('Admin Content.')
}
