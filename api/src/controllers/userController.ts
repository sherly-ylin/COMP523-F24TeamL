import { Request, Response } from 'express'
import { User } from '../models/userSchema.js'
import * as UserService from '../services/userService'

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body)
    res.status(201).json(user) // Password is already excluded
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log('userController req.userid: ', req.params.userId)
    const user = await UserService.getUserProfileById(req.params.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    console.log('gotuser:', user)
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(req.params.userId, req.body)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUser(req.params.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
