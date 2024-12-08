import mongoose, { Document, Schema, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id?: Types.ObjectId
  username: string
  first_name: string
  last_name: string
  email: string
  role: 'provider' | 'admin' | 'superadmin';
  password: string
  team_id?: string
  team_name?: string
  comparePassword: (inputPassword: string) => Promise<boolean>;
}

export const UserSchema: Schema<IUser> = new Schema({
  _id: { type: Types.ObjectId },
  username: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  role: { type: String, required: true },
  password: { type: String, required: true },
  team_id: { type: String, ref: 'Team' },
  team_name: {type: String, ref: 'Team'},
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (inputPassword: string) {
  return bcrypt.compare(inputPassword, this.password);
};


export const User = mongoose.model<IUser>('User', UserSchema)
