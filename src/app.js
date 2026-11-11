const express = require('express');
const { authenticate } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(authenticate);

app.use('/cart', require('./routes/cart'));
app.use('/orders', require('./routes/orders'));
app.use('/admin', require('./routes/admin'));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.code || 'INTERNAL_ERROR', message: err.message });
});

module.exports = app;
