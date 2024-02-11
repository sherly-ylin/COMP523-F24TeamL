import { Schema, model } from 'mongoose'

export interface IUser {
  uid: string
  username: string
  user_fname: string
  user_lname: string
  user_email: string
  password: string
  verified: boolean
  uniqueString: string
  roles: Array<string>
}

export const UserSchema = new Schema<IUser>({
  uid: String,
  username: String,
  user_fname: String,
  user_lname: String,
  user_email: String,
  password: String,
  verified: Boolean,
  uniqueString: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
})

export const User = model('User', UserSchema)
