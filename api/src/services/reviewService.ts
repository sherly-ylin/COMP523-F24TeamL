import { Review } from '../models/review';
import { IReview } from '../models/types';

export class ReviewService {
  async updateReview(reviewId: string, updateData: Partial<IReview>): Promise<IReview | null> {
    return await Review.findByIdAndUpdate(
      reviewId,
      { $set: updateData },
      { new: true }
    );
  }

  async getReviewsByAdminId(adminId: string): Promise<IReview[]> {
    return await Review.find({ admin_id: adminId });
  }

  async getReviewsByTeamId(teamId: string): Promise<IReview[]> {
    return await Review.find({ team_id: teamId });
  }
}