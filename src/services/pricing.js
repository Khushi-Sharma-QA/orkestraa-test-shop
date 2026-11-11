const GST_RATE = 0.18;
const FREE_SHIPPING_ABOVE = 999;
const SHIPPING_FEE = 49;

function subtotalOf(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty, 0);
}

function computeTotals(items, discount = 0) {
  const subtotal = subtotalOf(items);
  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const taxable = subtotal - discount;
  const tax = taxable * GST_RATE;
  const total = taxable + tax + shipping;
  return { subtotal, discount, tax, shipping, total };
}

module.exports = { computeTotals, subtotalOf, GST_RATE };
