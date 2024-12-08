import { Request, Response } from 'express'
import * as TeamService from '../services/teamServices'

export class TeamController {

  async createTeam(req: Request, res: Response) {
    try {
      const team = await TeamService.createTeam(req.body)
      res.status(201).json(team)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async updateTeam(req: Request, res: Response) {
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

  async getTeam(req: Request, res: Response) {
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

  async deleteTeam(req: Request, res: Response) {
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
}
