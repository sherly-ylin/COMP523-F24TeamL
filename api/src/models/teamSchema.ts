import { model, Schema, Types } from 'mongoose'

export interface ITeam {
  _id?: Types.ObjectId
  team_id: string
  team_name: string
  users: string[]
}

const TeamSchema = new Schema<ITeam>(
  {
    // team_id is human-readable and customizable
    _id: { type: Types.ObjectId },
    team_id: { type: String, required: true, unique: true },
    team_name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
)

export const Team = model<ITeam>('Team', TeamSchema)
