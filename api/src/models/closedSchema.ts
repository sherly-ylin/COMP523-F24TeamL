import mongoose, {Schema} from 'mongoose'

// Create a schema
const closedSchema = new mongoose.Schema({
  uid: String,
  ESP: String,
  closure_date: String,
  employment_status: String,
  engagement_activities: [String],
  closure_reason: [String],
  user_email: String,
  team_id: {type: Schema.Types.ObjectId, ref: 'Team'},
  admin_id: {type: Schema.Types.ObjectId, ref: 'User'},
  login: {type: String, required: true},
  password: {type: String, required: true},
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
    required: true
  },
  assigned_date: {type: Date}
})

// Create a model
export const closedModel = mongoose.model('closed_cases', closedSchema)
