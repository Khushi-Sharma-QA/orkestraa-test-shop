const { coupons, usage } = require('../data/store');

function couponError(code, message) {
  const err = new Error(message);
  err.status = 400;
  err.code = code;
  return err;
}

// Returns true if `now` is on or before the end of the expiry date in IST.
function isNotExpired(coupon, now = new Date()) {
  const endOfDayIST = new Date(`${coupon.expiresOn}T23:59:59.999+05:30`);
  return now.getTime() <= endOfDayIST.getTime();
}

function validateCoupon(code, userId, subtotal, now = new Date()) {
  const coupon = coupons[String(code || '').toUpperCase()];
  if (!coupon || !coupon.active) throw couponError('COUPON_INVALID', 'Coupon code is not valid');
  if (!isNotExpired(coupon, now)) throw couponError('COUPON_EXPIRED', 'Coupon has expired');
  if (subtotal < coupon.minOrder) throw couponError('COUPON_MIN_ORDER', `Minimum order value is ${coupon.minOrder}`);
  const used = (usage[userId] && usage[userId][coupon.code]) || 0;
  if (used >= coupon.perUserLimit) throw couponError('COUPON_LIMIT_REACHED', 'You have already used this coupon');
  return coupon;
}

function discountFor(coupon, subtotal) {
  if (coupon.type === 'percent') {
    const raw = (subtotal * coupon.value) / 100;
    return coupon.maxDiscount ? Math.min(raw, coupon.maxDiscount) : raw;
  }
  return Math.min(coupon.value, subtotal);
}

// Applies the given coupon codes and returns the total discount.
function applyCoupons(codes, userId, subtotal, now = new Date()) {
  const list = Array.isArray(codes) ? codes : codes ? [codes] : [];
  let discount = 0;
  const applied = [];
  for (const code of list) {
    const coupon = validateCoupon(code, userId, subtotal, now);
    discount += discountFor(coupon, subtotal);
    applied.push(coupon.code);
  }
  return { discount, applied };
}

function recordUsage(userId, codes) {
  usage[userId] = usage[userId] || {};
  for (const c of codes) usage[userId][c] = (usage[userId][c] || 0) + 1;
}

module.exports = { validateCoupon, applyCoupons, discountFor, recordUsage, isNotExpired };
