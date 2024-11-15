import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  role: string
  username: string
  password: string
  firstname: string
  lastname: string
}

export const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  username: String,
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
})

export const User = mongoose.model<IUser>('User', UserSchema)
