const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { coupons, orders } = require('../data/store');
const { buildOrderExportQuery } = require('../db/reports');

const router = express.Router();

router.post('/coupons', requireAdmin, (req, res) => {
  const { code, type, value, minOrder = 0, expiresOn, perUserLimit = 1, maxDiscount } = req.body;
  if (!code || !['percent', 'flat'].includes(type) || !(value > 0) || !expiresOn) {
    return res.status(400).json({ error: 'VALIDATION_ERROR' });
  }
  const key = code.toUpperCase();
  coupons[key] = { code: key, type, value, minOrder, expiresOn, perUserLimit, maxDiscount, active: true };
  res.status(201).json(coupons[key]);
});

// GET /admin/orders/export?email=&from=&to=&page=1
// Returns a CSV of orders for finance, plus the warehouse query used for the full export.
router.get('/orders/export', (req, res) => {
  const { email, from, to } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const query = buildOrderExportQuery({ customerEmail: email, from, to, page });
  const rows = orders
    .filter((o) => !email || o.customerEmail === email)
    .map((o) => [o.id, o.customerEmail, o.createdAt, o.total].join(','));
  res.set('X-Export-Query', query);
  res.type('text/csv').send(['id,customer_email,created_at,total', ...rows].join('\n'));
});

module.exports = router;
