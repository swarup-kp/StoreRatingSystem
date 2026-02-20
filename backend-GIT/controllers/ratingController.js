const db = require("../config/db");

// Submit or Update Rating
exports.submitRating = (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  if (!store_id || !rating) {
    return res.status(400).json({ message: "Store and rating are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  // Check if rating already exists
  db.query(
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
    [user_id, store_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        // Update existing rating
        db.query(
          "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
          [rating, user_id, store_id],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Rating updated successfully" });
          }
        );
      } else {
        // Insert new rating
        db.query(
          "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
          [user_id, store_id, rating],
          (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Rating submitted successfully" });
          }
        );
      }
    }
  );
};