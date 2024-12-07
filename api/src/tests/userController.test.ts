import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUserProfile } from '../controllers/userController'
import { User } from '../models/userSchema'

// Mock the dependencies
jest.mock('jsonwebtoken')
jest.mock('../models/userSchema')

describe('getUserProfile', () => {
  const mockResponse = () => {
    const res: Partial<Response> = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  const mockRequest = (authToken: string) => {
    return {
      headers: { authorization: `Bearer ${authToken}` },
    } as Request
  }

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('should return user profile for valid token', async () => {
    const mockUser = {
      _id: '123',
      username: 'henry',
      firstname: 'Henry',
      lastname: 'Liu',
      email: 'liuheng1@unc.edu',
      role: 'admin',
    }

    // Mocking the return values of dependencies
    jwt.verify = jest.fn().mockReturnValue({ id: '123' })
    User.findById = jest.fn().mockResolvedValue(mockUser)

    const req = mockRequest('validtoken')
    const res = mockResponse()

    await getUserProfile(req, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      id: mockUser._id,
      username: mockUser.username,
      first_name: mockUser.firstname,
      last_name: mockUser.lastname,
      email: mockUser.email,
      role: mockUser.role,
      team_name: null,
    })
  })

  it('should return 403 for missing token', async () => {
    const req = mockRequest('')
    const res = mockResponse()

    await getUserProfile(req, res as Response)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' })
  })

  it('should return 404 if user not found', async () => {
    const mockUser = null
    jwt.verify = jest.fn().mockReturnValue({ id: '123' })
    User.findById = jest.fn().mockResolvedValue(mockUser)

    const req = mockRequest('validtoken')
    const res = mockResponse()

    await getUserProfile(req, res as Response)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })
  })

  it('should handle errors in jwt.verify', async () => {
    const error = new Error('Invalid token')
    jwt.verify = jest.fn().mockImplementation(() => { throw error })

    const req = mockRequest('invalidtoken')
    const res = mockResponse()

    await getUserProfile(req, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' })
  })
})
