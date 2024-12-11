import mongoose, { Document, Schema, Types } from 'mongoose'
import Counter from "./counterSchema";

export interface ITeam extends Document{
  team_id: number
  team_name: string
  user_ids: Types.ObjectId[];
}

export const TeamSchema:Schema<ITeam> = new Schema<ITeam>(
  {
    // team_id is human-readable and customizable
    _id: { type: Number, required: true, unique: true },
    team_name: { type: String, required: true },
    user_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  },
  {
    timestamps: true,
  }
)

// TeamSchema.pre('save', async function (next) {
//   console.log("Pre-save hook triggered for:", this);

//   if (!this.isNew || this.team_id) {
//     return next();
//   }
//   const counter = await Counter.findByIdAndUpdate(
//     { _id: "team_id" },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   console.log("Fetched counter value:", counter);
//   this.team_id = counter.seq;
//   console.log("team presave: ", this)
//   next();
// });

export const Team = mongoose.model<ITeam>('Team', TeamSchema)


