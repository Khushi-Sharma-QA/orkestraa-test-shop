const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { coupons } = require('../data/store');

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

module.exports = router;
