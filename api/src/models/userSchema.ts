import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IUser extends Document {
  _id?: Types.ObjectId,
  email: string
  role: string
  username: string
  password: string
  firstname: string
  lastname: string
}

export const UserSchema: Schema<IUser> = new Schema({
  _id: {type: Types.ObjectId},
  email: { type: String, required: true },
  role: { type: String, required: true },
  username: String,
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
})

export const User = mongoose.model<IUser>('User', UserSchema)
