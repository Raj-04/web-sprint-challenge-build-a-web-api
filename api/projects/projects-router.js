const express = require('express')
const Projects = require('./projects-model')
const {
  handleError,
} = require('./projects-middleware')
const server = require('../server')

const router = express.Router()

router.use(handleError)

module.exports = router
