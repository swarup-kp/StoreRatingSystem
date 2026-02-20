const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Admin - Add store
router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  storeController.addStore
);

// User - Get all stores
router.get(
  "/",
  verifyToken,
  storeController.getStores
);

// Admin Dashboard Stats
router.get(
  "/admin/stats",
  verifyToken,
  authorizeRoles("ADMIN"),
  storeController.getAdminStats
);

// Owner Dashboard
router.get(
  "/owner/dashboard",
  verifyToken,
  authorizeRoles("OWNER"),
  storeController.getOwnerDashboard
);

module.exports = router;

