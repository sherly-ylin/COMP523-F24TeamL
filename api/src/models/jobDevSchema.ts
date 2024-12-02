import mongoose, { Schema } from 'mongoose'

// Create a schema
const jobDevSchema = new mongoose.Schema({
  date_participated: [String],
  uid: String,
  employment_goal: String,
  employer_contacted: String,
  employer_hiring: String,
  contact_method: Array,
  date_of_contact: String,
  nature_of_visit: String,
  visit_desc: String,
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

// Create a model
export const jobDevModel = mongoose.model('job_dev_log', jobDevSchema)
