const { validateCoupon, discountFor } = require('../src/services/coupons');
const { coupons } = require('../src/data/store');

describe('coupon validation', () => {
  test('coupon is valid until end of expiry day IST (inclusive)', () => {
    const lastMinute = new Date('2026-11-10T23:59:00+05:30');
    expect(validateCoupon('DIWALI200', 'u9', 2500, lastMinute).code).toBe('DIWALI200');
  });

  test('coupon is rejected the day after expiry', () => {
    const nextDay = new Date('2026-11-11T00:00:01+05:30');
    expect(() => validateCoupon('DIWALI200', 'u9', 2500, nextDay)).toThrow('Coupon has expired');
  });

  test('minimum order value is enforced', () => {
    expect(() => validateCoupon('FEST10', 'u9', 500, new Date('2026-11-01T10:00:00+05:30'))).toThrow(/Minimum order/);
  });

  test('flat discount', () => {
    expect(discountFor(coupons.WELCOME50, 800)).toBe(50);
  });

  test('percentage discount respects max cap', () => {
    expect(discountFor(coupons.FEST10, 10000)).toBe(500);
  });
});
