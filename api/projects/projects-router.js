const express = require('express')
const Projects = require('./projects-model')
const {
  handleError,
  projectIdChecker,
  validateProject,
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

router.post('/', validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body)
    res.status(201).json(newProject)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', validateProject, projectIdChecker, async (req, res, next) => {
  if (req.body.completed === undefined) {
    next({
      status: 400,
      message: 'missing required fields'
    })
  } else {
    try {
      const updatedProject = await Projects.update(req.params.id, req.body)
      res.status(200).json(updatedProject)
    } catch (err) {
      next(err)
    }
  }
})

router.use(handleError)

module.exports = router
