const request = require('supertest');
const app = require('../src/app');

describe('admin order export', () => {
  test('admin can export orders as CSV', async () => {
    const res = await request(app).get('/admin/orders/export')
      .set('x-user-id', 'admin1').set('x-role', 'admin');
    expect(res.status).toBe(200);
    expect(res.text.split('\n')[0]).toBe('id,customer_email,created_at,total');
  });

  test('order history supports custom page size', async () => {
    const res = await request(app).get('/orders?page=1&pageSize=5').set('x-user-id', 'u1');
    expect(res.body.orders).toHaveLength(5);
  });
});
