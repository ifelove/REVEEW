const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getSingleReview,
  deleteReview,
  updateReview,
  createReview,
} = require("../controllers/reviewController");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

router
  .route("/:id")
  .post(authenticateUser, authorizeRoles("admin", "user"), createReview);
router.route("/:id").get(getAllReviews);
router
  .route("/modify/:id")
  .patch(authenticateUser, authorizeRoles("admin"), updateReview)
  .delete(authenticateUser, authorizeRoles("admin"), deleteReview)
  .get(getSingleReview);

module.exports = router;
