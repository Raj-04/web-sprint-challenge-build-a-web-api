const Actions = require('./actions-model')

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    productionMessage: "Sorry, there was a problem!",
  })
}

module.exports = {
  handleError
}
