import mongoose from 'mongoose'

const IPSSchema = new mongoose.Schema({
  staff_name: String,
  time_period: String,
  work_week: String,
  hours_worked: Number,
  team_hours_spent: Number,
  community_hours_spent: Number,
  train_PTO_hours_spent: Number,
})

export const IPSLogModel = mongoose.model('ips_activity_log', IPSSchema)
