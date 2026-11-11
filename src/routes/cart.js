const express = require('express');
const { applyCoupons, recordUsage } = require('../services/coupons');
const { computeTotals, subtotalOf } = require('../services/pricing');

const router = express.Router();

// body: { items: [{ sku, price, qty }], coupons: ["FEST10"] }
router.post('/checkout', (req, res, next) => {
  try {
    const items = req.body.items || [];
    if (!items.length) return res.status(400).json({ error: 'CART_EMPTY' });
    const subtotal = subtotalOf(items);
    const { discount, applied } = applyCoupons(req.body.coupons, req.user.id, subtotal);
    const totals = computeTotals(items, discount);
    if (applied.length) recordUsage(req.user.id, applied);
    res.json({ ...totals, coupons: applied });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
