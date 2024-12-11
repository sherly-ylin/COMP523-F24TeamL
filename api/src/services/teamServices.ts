import Counter from '../models/counterSchema'
import { ITeam, Team } from '../models/teamSchema'
import { User } from '../models/userSchema'

export const createTeam = async (teamData: Partial<ITeam>): Promise<ITeam> => {
  if (!teamData.team_name) {
    throw new Error('Team name is required.')
  }
  // Ensure all user_ids exist in the db if given user_ids
  if (teamData.user_ids && teamData.user_ids.length > 0) {
    const usersExist = await User.find({
      _id: { $in: teamData.user_ids },
    }).countDocuments()
    if (usersExist !== teamData.user_ids.length) {
      throw new Error('One or more user IDs are invalid.')
    }
  }
  // Set numeric team_id
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'team_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  )
  teamData._id = counter.seq

  const team = new Team(teamData)
  return await team.save()
}

export const getTeamById = async (id: string): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')
  return await Team.findById(id).select('user_ids')
}

export const getAllTeams = async (): Promise<ITeam[]> => {
  return await Team.find()
}

export const updateTeam = async (
  id: string,
  teamData: Partial<ITeam>,
): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')

  // Ensure all user_ids exist in the db if includes user_ids
  if (teamData.user_ids && teamData.user_ids.length > 0) {
    const usersExist = await User.find({
      _id: { $in: teamData.user_ids },
    }).countDocuments()
    if (usersExist !== teamData.user_ids.length) {
      throw new Error('One or more user IDs are invalid.')
    }
  }
  try {
    const updated = await Team.findByIdAndUpdate(id, teamData, {
      new: true,
    })
    if (!updated) return null
    return updated
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteTeam = async (id: string): Promise<ITeam | null> => {
  if (!id) throw new Error('Team ID is required.')
  try {
    return await Team.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    return null
  }
}
