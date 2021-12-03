const express = require('express')
const Projects = require('./projects-model')
const {
  handleError,
} = require('./projects-middleware')
const server = require('../server')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get()
    res.status(200).json(projects)
  } catch (err) {
    next(err)
  }
})

router.use(handleError)

module.exports = router
