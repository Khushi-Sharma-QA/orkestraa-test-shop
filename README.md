# orkestraa-test-shop

ShopKart checkout API (fictional). Node.js + Express, in-memory data store.

> This repository is a **test fixture** for AI-agent testing. It contains intentionally planted bugs. Do not use in production.

## Run

```bash
npm install
npm start        # API listens on http://localhost:3000
npm test
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /cart/checkout | Price a cart, optionally with coupon codes |
| GET | /orders?page=1 | Current user's order history, 10 per page |
| POST | /admin/coupons | Create a coupon (admin only) |

Auth is simulated with headers: `x-user-id` and `x-role` (`customer` or `admin`).
