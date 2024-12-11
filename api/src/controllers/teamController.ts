import { Request, Response } from 'express'
import * as TeamService from '../services/teamServices'

export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.createTeam(req.body)
    res.status(201).json(team)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamService.getAllTeams()
    if (!teams) {
      return res.status(404).json({ error: 'No team found' })
    }
    res.json(teams)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.getTeamById(req.params.id)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.updateTeam(req.params.id, req.body)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const deleted = await TeamService.deleteTeam(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}
