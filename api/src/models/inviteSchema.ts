import mongoose, { Document, Schema } from 'mongoose'

export interface IInvite extends Document {
  email: string
  role: 'provider' | 'admin' | 'superadmin'
  token: string
  timespan: { value: number; unit: 'day' | 'week' | 'month' | 'year' } // Flexible duration
  expiresAt: Date
  inviter: mongoose.Schema.Types.ObjectId
}

// Create a schema
const InviteSchema: Schema<IInvite> = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, enum: ['provider', 'admin', 'superadmin'], required: true },
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
  },
  { timestamps: true },
) // Automatically add createdAt and updatedAt fields

// Create a model
export const Invite = mongoose.model<IInvite>('Invite', InviteSchema)
