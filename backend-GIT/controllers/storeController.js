const db = require("../config/db");

// ADMIN - Add Store
exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
    [name, email, address, owner_id || null],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({ message: "Store added successfully" });
    }
  );
};

// USER - Get All Stores with Average Rating
exports.getStores = (req, res) => {
  const query = `
    SELECT 
      stores.id,
      stores.name,
      stores.address,
      IFNULL(AVG(ratings.rating), 0) AS avgRating
    FROM stores
    LEFT JOIN ratings ON stores.id = ratings.store_id
    GROUP BY stores.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// ADMIN DASHBOARD STATS
exports.getAdminStats = (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, usersResult) => {
    if (err) return res.status(500).json(err);

    stats.totalUsers = usersResult[0].totalUsers;

    db.query("SELECT COUNT(*) AS totalStores FROM stores", (err, storesResult) => {
      if (err) return res.status(500).json(err);

      stats.totalStores = storesResult[0].totalStores;

      db.query("SELECT COUNT(*) AS totalRatings FROM ratings", (err, ratingsResult) => {
        if (err) return res.status(500).json(err);

        stats.totalRatings = ratingsResult[0].totalRatings;

        res.json(stats);
      });
    });
  });
};

// OWNER DASHBOARD
exports.getOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  const query = `
    SELECT 
      stores.name AS storeName,
      users.name AS userName,
      users.email,
      ratings.rating
    FROM stores
    LEFT JOIN ratings ON stores.id = ratings.store_id
    LEFT JOIN users ON ratings.user_id = users.id
    WHERE stores.owner_id = ?
  `;

  db.query(query, [ownerId], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.json({
        storeName: null,
        averageRating: 0,
        ratings: []
      });
    }

    const storeName = results[0].storeName;

    const ratings = results
      .filter(r => r.rating !== null)
      .map(r => ({
        userName: r.userName,
        email: r.email,
        rating: r.rating
      }));

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

    res.json({
      storeName,
      averageRating,
      ratings
    });
  });
};