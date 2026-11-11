const express = require('express');
const { orders } = require('../data/store');

const router = express.Router();
const PAGE_SIZE = 10;

// GET /orders?page=1  -> newest first, 10 per page, pages start at 1
router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const mine = orders
    .filter((o) => o.userId === req.user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const start = (page - 1) * PAGE_SIZE;
  res.json({ page, pageSize: PAGE_SIZE, total: mine.length, orders: mine.slice(start, start + PAGE_SIZE) });
});

module.exports = router;
