const express = require('express')
const Actions = require('./actions-model')
const {
  handleError,
} = require('./actions-middlware')

const router = express.Router()


router.use(handleError)

module.exports = router
