import { Schema, model } from 'mongoose';
import { ITeam } from './types';

const TeamSchema = new Schema<ITeam>({
  team_name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

export const Team = model<ITeam>('Team', TeamSchema);