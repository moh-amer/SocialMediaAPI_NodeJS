import express from "express";
import { authenticate, authorize } from "../middlewares/authentication.js";
import Review from "../db/models/review.js";
import * as reviewController from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.use(express.json());

//get specific review for a specific post
reviewRouter.get(
  "/:review_id",
  authenticate,
  authorize,
  reviewController.getReviewByID
);

reviewRouter.delete(
  "/:review_id",
  authenticate,
  authorize,
  reviewController.deleteReview
);

reviewRouter.patch(
  "/:review_id",
  authenticate,
  authorize,

  reviewController.updateReview
);

export default reviewRouter;
