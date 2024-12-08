import { User, IUser} from '../models/userSchema';

export const createUserFromDB = async (userData: Partial<IUser>): Promise<Record<string, any>> => {
    if (userData.role === 'provider' && !userData.team_id) {
        throw new Error('Provider role requires a team_id.');
    }
    if (userData.role !== 'provider' && userData.team_id) {
        delete userData.team_id;
    }
    const user = new User(userData);
    await user.save();
    const userInfo = user.toObject();
    delete userInfo.password; // Don't return password
    return userInfo;
};

export const getUserByIdFromDB = async (id: string): Promise<Record<string, any> | null> => {
    if (!id) throw new Error('User ID is required.');
    const user = await User.findById(id);
    if (!user) return null;
    const userInfo = user.toObject();
    delete userInfo.password; // Don't return password
    return userInfo;
};

export const getUserProfileByIdFromDB = async (id: string): Promise<Record<string, any> | null> => {
    if (!id) throw new Error('User ID is required.');
    const user = await User.findById(id);
    if (!user) return null;
    const userInfo = user.toObject();
    
    delete userInfo.password; // Don't return password
    
    //To be replace with team_neam found in db
    userInfo.team_name = userInfo.team_id;
    delete userInfo.team_id;
    return userInfo;
};
export const getAllUsersFromDB = async (): Promise<Record<string, any>[]> => {
    const users = await User.find();
    return users.map((user) => {
        const userInfo = user.toObject();
        delete userInfo.password; // Don't return password
        return userInfo;
    });
};

export const updateUserFromDB = async (
    id: string,
    userData: Partial<IUser>
): Promise<Record<string, any> | null> => {
    if (!id) throw new Error('User ID is required.');
    if (userData.role === 'provider' && !userData.team_id) {
        throw new Error('Provider role requires a team_id.');
    }
    if (userData.role !== 'provider' && userData.team_id) {
        delete userData.team_id;
    }
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) return null;
    const userInfo = user.toObject();
    delete userInfo.password; // Don't return password
    return userInfo;
};

export const deleteUserFromDB = async (id: string): Promise<Record<string, any> | null> => {
    if (!id) throw new Error('User ID is required.');
    const user = await User.findByIdAndDelete(id);
    if (!user) return null;
    const userInfo = user.toObject();
    delete userInfo.password; // Don't return password
    return userInfo;
};
