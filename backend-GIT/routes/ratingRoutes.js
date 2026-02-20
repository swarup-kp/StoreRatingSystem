const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Only USER can rate
router.post(
  "/",
  verifyToken,
  authorizeRoles("USER"),
  ratingController.submitRating
);

module.exports = router;