import mongoose, { Schema } from 'mongoose'

const staffingSchema = new mongoose.Schema({
  uid: String,
  agency_name: String,
  eval_dates: [String],
  date_completed: String,
  staff_name: String,
  job_titles: String,
  other_roles: String,
  time_spent: Number,
  start_date: String,
  end_date: String,
  hours_worked: Number,
  IPS_training: [String],
  user_email: String,
  team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
  admin_id: { type: Schema.Types.ObjectId, ref: 'User' },
  login: { type: String, required: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
    required: true,
  },
  assigned_date: { type: Date },
})

export const staffingModel = mongoose.model('staffing_level', staffingSchema)
