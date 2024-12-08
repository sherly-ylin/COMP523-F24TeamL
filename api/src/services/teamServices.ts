import { ITeam, Team } from '../models/teamSchema'
import { User } from '../models/userSchema'

export const createTeam = async (teamData: Partial<ITeam>): Promise<ITeam> => {
  if (!teamData.team_name) {
    throw new Error('Team name is required.')
  }
  // Ensure all user_ids exist in the db if have user_ids
  if (teamData.user_ids && teamData.user_ids.length > 0) {
    const usersExist = await User.find({
      _id: { $in: teamData.user_ids },
    }).countDocuments()
    if (usersExist !== teamData.user_ids.length) {
      throw new Error('One or more user IDs are invalid.')
    }
  }

  const team = new Team(teamData)
  return await team.save()
}

export const getTeamById = async (id: string): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')
  return await Team.findById(id).populate('user_ids', '-password') // Populate user details, exclude passwords
}

export const getAllTeams = async (): Promise<ITeam[]> => {
  return await Team.find().populate('user_ids', '-password')
}

export const updateTeam = async (
  id: string,
  teamData: Partial<ITeam>,
): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')

  // Ensure all user_ids exist in the db if updating user_ids
  if (teamData.user_ids && teamData.user_ids.length > 0) {
    const usersExist = await User.find({
      _id: { $in: teamData.user_ids },
    }).countDocuments()
    if (usersExist !== teamData.user_ids.length) {
      throw new Error('One or more user IDs are invalid.')
    }
  }

  return await Team.findByIdAndUpdate(id, teamData, { new: true }).populate(
    'user_ids',
    '-password',
  )
}

export const deleteTeam = async (id: string): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')
  return await Team.findByIdAndDelete(id)
}
