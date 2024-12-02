import { ITeam, Team } from '../models/teamSchema'
// import { ITeam } from '../models/types';

export class TeamService {
  async createTeam(teamData: Omit<ITeam, '_id'>): Promise<ITeam> {
    const newTeam = new Team(teamData)
    return await newTeam.save()
  }

  async updateTeam(
    teamId: string,
    updateData: Partial<ITeam>,
  ): Promise<ITeam | null> {
    return await Team.findByIdAndUpdate(
      teamId,
      { $set: updateData },
      { new: true },
    )
  }

  async getTeamById(teamId: string): Promise<ITeam | null> {
    return await Team.findById(teamId)
  }

  async deleteTeam(teamId: string): Promise<boolean> {
    const result = await Team.findByIdAndDelete(teamId)
    return !!result
  }
}
