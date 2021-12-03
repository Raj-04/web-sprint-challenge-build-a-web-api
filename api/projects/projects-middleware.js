const Projects = require('../projects/projects-model')

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`)
  next()
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    productionMessage: "Sorry, there was a problem!",
  })
}

module.exports = {
  handleError,
  logger,
}
