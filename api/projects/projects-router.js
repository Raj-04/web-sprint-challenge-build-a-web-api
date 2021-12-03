const express = require('express')
const Projects = require('./projects-model')
const {
  handleError,
  projectIdChecker,
} = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get()
    res.status(200).json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', projectIdChecker, (req, res, next) => {
  res.status(200).json(req.project)
})

router.use(handleError)

module.exports = router
