// // middleware/verifyAdmin.js
// require('dotenv').config();
// module.exports = function (req, res, next) {
//   console.log("hi")
//   const userId = req.auth?.userId;
//   if (!userId) return res.status(401).json({ error: 'Unauthorized' });
//   console.log(userId);
//   // optionally check against a list of admin user IDs or roles
//   if (userId !== process.env.ADMIN_USER_ID) {
//     return res.status(403).json({ error: 'Forbidden: Not an admin' });
//   }

//   next();
// };
