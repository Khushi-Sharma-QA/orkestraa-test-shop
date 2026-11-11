// Simulated auth: real deployments use JWT. Headers are trusted here for testing only.
function authenticate(req, res, next) {
  const userId = req.header('x-user-id');
  if (!userId) return res.status(401).json({ error: 'UNAUTHENTICATED' });
  req.user = { id: userId, role: req.header('x-role') || 'customer' };
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'FORBIDDEN' });
  }
  next();
}

module.exports = { authenticate, requireAdmin };
