import mongoose, { Document, Schema, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  username: string
  first_name: string
  last_name: string
  email: string
  role: string
  password: string
  team_id?: string | null
  team_name?: string | null
  comparePassword: (inputPassword: string) => Promise<boolean>;
}

export const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  role: { type: String, required: true, enum: ['provider', 'admin', 'superadmin'] },
  password: { type: String, required: true },
  team_id: { type: Number, ref: 'Team' },
  team_name: {type: String, ref: 'Team'},
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const valid = await bcrypt.compare(inputPassword, this.password);
  return valid
};


export const User = mongoose.model<IUser>('User', UserSchema)
