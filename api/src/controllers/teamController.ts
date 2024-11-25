import { Request, Response } from 'express';
import { TeamService } from '../services/teamService';

export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  async createTeam(req: Request, res: Response) {
    try {
      const team = await this.teamService.createTeam(req.body);
      res.status(201).json(team);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateTeam(req: Request, res: Response) {
    try {
      const team = await this.teamService.updateTeam(req.params.id, req.body);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getTeam(req: Request, res: Response) {
    try {
      const team = await this.teamService.getTeamById(req.params.id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteTeam(req: Request, res: Response) {
    try {
      const deleted = await this.teamService.deleteTeam(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}