import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';

const router = Router();
const reviewController = new ReviewController();

router.put('/:id', (req, res) => reviewController.updateReview(req, res));
router.get('/admin/:adminId', (req, res) => reviewController.getReviewsByAdmin(req, res));
router.get('/team/:teamId', (req, res) => reviewController.getReviewsByTeam(req, res));

export default router;