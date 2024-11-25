import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async updateReview(req: Request, res: Response) {
    try {
      const review = await this.reviewService.updateReview(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getReviewsByAdmin(req: Request, res: Response) {
    try {
      const reviews = await this.reviewService.getReviewsByAdminId(req.params.adminId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getReviewsByTeam(req: Request, res: Response) {
    try {
      const reviews = await this.reviewService.getReviewsByTeamId(req.params.teamId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}