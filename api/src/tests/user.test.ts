import dotenv from 'dotenv'
import mongoose from 'mongoose';
import * as UserService from '../services/userService';
import {User} from '../models/userSchema';


dotenv.config();
const { DATABASE_URI = '' } = process.env;

beforeAll(async () => {
    await mongoose.connect(DATABASE_URI);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('User Service Tests', () => {
    let userId: string;

    it('should create a new user with a hashed password', async () => {
        const user = await UserService.createUser({
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User',
            email: 'testuser@example.com',
            password: 'verysecurepassword',
            role: 'provider',
            team_id: 'team123',
        });
        userId = user.id;
        expect(user.password).toBeUndefined(); // Password should not be included
    });

    it('should compare passwords correctly', async () => {
        const user = await User.findById(userId);
        const isMatch = await user?.comparePassword('verysecurepassword');
        expect(isMatch).toBe(true);
    });

    it('should fetch a user by ID', async () => {
        const user = await UserService.getUserById(userId);
        expect(user?.id).toBe(userId);
    });

    it('should fetch all users', async () => {
        const users = await UserService.getAllUsers();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should update a user', async () => {
        const updatedUser = await UserService.updateUser(userId, { first_name: 'Updated' });
        expect(updatedUser?.first_name).toBe('Updated');
    });

    it('should delete a user', async () => {
        const deletedUser = await UserService.deleteUser(userId);
        expect(deletedUser?.id).toBe(userId);
    });

    it('should throw an error for missing team_id in provider role', async () => {
        await expect(
            UserService.createUser({
                username: 'invaliduser',
                first_name: 'Invalid',
                last_name: 'User',
                email: 'invaliduser@example.com',
                role: 'provider',
            })
        ).rejects.toThrow('Provider role requires a team_id.');
    });
});
