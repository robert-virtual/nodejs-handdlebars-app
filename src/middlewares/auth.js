/**
 * @type {import('../types').middleware}
 */
exports.auth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};
