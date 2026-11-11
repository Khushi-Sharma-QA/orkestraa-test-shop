const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('non-admin cannot create coupons', async () => {
    const res = await request(app).post('/admin/coupons')
      .set('x-user-id', 'u1').set('x-role', 'customer')
      .send({ code: 'HACK', type: 'flat', value: 999, expiresOn: '2027-01-01' });
    expect(res.status).toBe(403);
  });

  test('order history page 1 returns the 10 newest orders', async () => {
    const res = await request(app).get('/orders?page=1').set('x-user-id', 'u1');
    expect(res.status).toBe(200);
    expect(res.body.orders).toHaveLength(10);
    expect(res.body.orders[0].id).toBe('SK-480025');
  });

  test('checkout without items is rejected', async () => {
    const res = await request(app).post('/cart/checkout').set('x-user-id', 'u1').send({ items: [] });
    expect(res.status).toBe(400);
  });
});
