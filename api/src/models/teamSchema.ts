import { model, Schema, Types } from 'mongoose'

export interface ITeam {
  _id?: Types.ObjectId
  team_name: string
  users: string[]
}

const TeamSchema = new Schema<ITeam>(
  {
    //can add another team_id field for application usage but _id is equivalent to team_id so it is a personal preference
    _id: { type: Types.ObjectId },
    team_name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
)

export const Team = model<ITeam>('Team', TeamSchema)
