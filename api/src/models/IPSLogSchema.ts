import mongoose, { Schema } from 'mongoose'

const IPSSchema = new mongoose.Schema({
  uid: String,
  staff_name: String,
  time_period: String,
  work_week: String,
  hours_worked: Number,
  team_hours_spent: Number,
  community_hours_spent: Number,
  train_PTO_hours_spent: Number,
  user_email: String,
  team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
  admin_id: { type: Schema.Types.ObjectId, ref: 'User' },
  login: { type: String},
  password: { type: String},
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
    required: true,
  },
  assigned_date: { type: Date },
})

export const IPSLogModel = mongoose.model('ips_activity_log', IPSSchema)
