import { IUser, User } from '../models/userSchema'
import { Team } from '../models/teamSchema'
export const createUser = async (
  userData: Partial<IUser>,
): Promise<Record<string, any>> => {
  if (userData.role === 'provider' && !userData.team_id) {
    throw new Error('Provider role requires a team_id.')
  }
  const user = new User(userData)
  if (userData.role !== 'provider') {
    userData.team_id = null
    userData.team_name = null
  } else {
    const team = await Team.findOne({team_id: userData.team_id})
    if(!team){
      throw new Error("Team associated with user's team_id not found.")
    }
    userData.team_name = team.team_name
  }
  await user.save()
  const userInfo = user.toObject()
  delete userInfo.password // Don't return password
  return userInfo
}

export const getUserById = async (
  id: string,
): Promise<Record<string, any> | null> => {
  if (!id) throw new Error('User ID is required.')
  const user = await User.findById(id)
  if (!user) return null
  const userInfo = user.toObject()
  delete userInfo.password // Don't return password
  return userInfo
}

export const getUserProfileById = async (
  id: string,
): Promise<Record<string, any> | null> => {
  if (!id) throw new Error('User ID is required.')
  const user = await User.findById(id)
  if (!user) return null
  const userInfo = user.toObject()

  delete userInfo.password // Don't return password

  //To be replace with team_neam found in db
  userInfo.team_name = userInfo.team_name
  return userInfo
}
export const getAllUsers = async (): Promise<Record<string, any>[]> => {
  const users = await User.find()
  return users.map((user) => {
    const userInfo = user.toObject()
    delete userInfo.password // Don't return password
    return userInfo
  })
}

export const updateUser = async (
  id: string,
  userData: Partial<IUser>,
): Promise<Record<string, any> | null> => {
  if (!id) throw new Error('User ID is required.')
  if (userData.role === 'provider' && !userData.team_id) {
    throw new Error('Provider role requires a team_id.')
  }
  if (userData.role !== 'provider' && userData.team_id) {
    delete userData.team_id
  }
  const user = await User.findByIdAndUpdate(id, userData, { new: true })
  if (!user) return null
  const userInfo = user.toObject()
  delete userInfo.password // Don't return password
  return userInfo
}

export const deleteUser = async (
  id: string,
): Promise<Record<string, any> | null> => {
  if (!id) throw new Error('User ID is required.')
  const user = await User.findByIdAndDelete(id)
  if (!user) return null
  const userInfo = user.toObject()
  delete userInfo.password // Don't return password
  return userInfo
}

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<string> => {
  if (!userId || !oldPassword || !newPassword) {
      throw new Error('User ID, old password, and new password are required.');
  }

  const user = await User.findById(userId).select('+password'); // Ensure the password field is fetched
  if (!user) {
      throw new Error('User not found.');
  }

  const isMatch = await user?.comparePassword(oldPassword);
  if (!isMatch) {
      throw new Error('Old password is incorrect.');
  }
  user.password = newPassword;

  await user.save();

  return 'Password changed successfully.';
};