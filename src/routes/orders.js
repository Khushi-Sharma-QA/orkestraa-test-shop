const express = require('express');
const { orders } = require('../data/store');

const router = express.Router();
const PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

// GET /orders?page=1&pageSize=10  -> newest first, pages start at 1
router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const mine = orders
    .filter((o) => o.userId === req.user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const size = Math.min(MAX_PAGE_SIZE, parseInt(req.query.pageSize, 10) || PAGE_SIZE);
  const start = (page - 1) * size;
  res.json({ page, pageSize: size, total: mine.length, orders: mine.slice(start, start + size) });
});

module.exports = router;
