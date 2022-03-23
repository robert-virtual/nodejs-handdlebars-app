/**
 * @type {import('../types').middleware}
 */
exports.layout = (req, res, next) => {
  res.app.locals.auth = true;
  if (!req.session.userId) {
    res.app.locals.auth = false;
  }
  next();
};
