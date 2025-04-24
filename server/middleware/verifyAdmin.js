// middleware/verifyAdmin.js
const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.auth?.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - user not found' });
    }

    if (user.publicMetadata?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - not an admin' });
    }

    next();
  } catch (err) {
    console.error("Error in verifyAdmin:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = verifyAdmin;
