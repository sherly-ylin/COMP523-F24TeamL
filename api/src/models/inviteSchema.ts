import mongoose, { Document, Schema } from 'mongoose'

export interface IInvite extends Document {
  email: string
  role: string
  token: string
  timespan: { value: number; unit: 'day' | 'week' | 'month' | 'year ' } // Flexible duration
  expiresAt: Date
  inviter: mongoose.Schema.Types.ObjectId
  team_id: mongoose.Schema.Types.ObjectId
  team_name: String
}

// Create a schema
const InviteSchema: Schema<IInvite> = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String, required: true },
    timespan: {
      value: { type: Number, required: true }, // Duration (e.g., 1, 7, 30)
      unit: {
        type: String,
        enum: ['day', 'week', 'month', 'year'], // Supported units for duration
        required: true,
      },
    },
    expiresAt: { type: Date },
    inviter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team', // Assuming there's a Team model
      
    },
    team_name: {
      type: String,
      ref: 'Team', // Assuming there's a Team model
      
    },

  },
  { timestamps: true },
) // Automatically add createdAt and updatedAt fields

// Create a model
export const Invite = mongoose.model<IInvite>('Invite', InviteSchema)
