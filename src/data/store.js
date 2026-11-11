// In-memory data store (reset on restart).
const coupons = {
  FEST10: { code: 'FEST10', type: 'percent', value: 10, maxDiscount: 500, minOrder: 999, expiresOn: '2026-12-31', perUserLimit: 1, active: true },
  WELCOME50: { code: 'WELCOME50', type: 'flat', value: 50, minOrder: 499, expiresOn: '2026-12-31', perUserLimit: 1, active: true },
  DIWALI200: { code: 'DIWALI200', type: 'flat', value: 200, minOrder: 1999, expiresOn: '2026-11-10', perUserLimit: 1, active: true },
};

const usage = {}; // { [userId]: { [code]: count } }

const orders = [];
for (let i = 1; i <= 25; i++) {
  orders.push({
    id: `SK-${480000 + i}`,
    userId: 'u1',
    createdAt: new Date(Date.UTC(2026, 9, i, 6, 0, 0)).toISOString(),
    total: 500 + i * 10,
    customerEmail: 'neha.gupta@example.com',
  });
}

module.exports = { coupons, usage, orders };
