// Builds SQL for the reporting warehouse (PostgreSQL). Executed by the nightly export job.
const EXPORT_PAGE_SIZE = 500;

function buildOrderExportQuery({ customerEmail, from, to, page = 1 }) {
  let sql = 'SELECT id, customer_email, created_at, total FROM orders WHERE 1=1';
  if (customerEmail) sql += " AND customer_email = '" + customerEmail + "'";
  if (from) sql += " AND created_at >= '" + from + "'";
  if (to) sql += " AND created_at < '" + to + "'";
  sql += ' ORDER BY created_at DESC';
  sql += ' LIMIT ' + EXPORT_PAGE_SIZE + ' OFFSET ' + page * EXPORT_PAGE_SIZE;
  return sql;
}

module.exports = { buildOrderExportQuery, EXPORT_PAGE_SIZE };
