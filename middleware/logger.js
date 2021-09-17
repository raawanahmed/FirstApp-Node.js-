function log(req, res, next) {
  console.log("logging..."); // req.body
  next();
}

module.exports = log;
