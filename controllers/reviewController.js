import Review from "../db/models/review.js";

const getReviewByID = async (req, res, next) => {
  const reviewID = req.params.review_id;
  const review = await Review.findOne({ _id: reviewID });
  res.send(review);
};

const deleteReview = async (req, res, next) => {
  const reviewID = req.params.review_id;
  const deleteResult = await Review.deleteOne({ _id: reviewID });
  res.status(200).json({
    statusCode: 200,
    message: "Review Deleted Successfully",
    data: deleteResult,
  });
};

const updateReview = async (req, res, next) => {
  const reviewID = req.params.review_id;
  const { rate } = req.body;
  const review = await Review.updateOne(
    { _id: reviewID },
    {
      rate,
      data: new Date(),
    }
  );

  res.status(200).json({
    statusCode: 200,
    message: "Review Updated Successfully",
    data: review,
  });
};

export { getReviewByID, deleteReview, updateReview };
