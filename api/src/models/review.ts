import { Schema, model } from 'mongoose';
import { IReview, ReviewStatus } from './types';

const ReviewSchema = new Schema<IReview>({
  team_id: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  admin_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(ReviewStatus),
    default: ReviewStatus.PENDING 
  },
  assigned_date: { type: Date, default: Date.now }
});

export const Review = model<IReview>('Review', ReviewSchema);