const express = require('express')
const Actions = require('./actions-model')
const {
  handleError,
  checkActionId,
  checkCompleted,
} = require('./actions-middlware')
const { projectIdChecker } = require('../projects/projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get()
    res.status(200).json(actions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkActionId, (req, res) => {
  res.status(200).json(req.actionById)
})

router.post('/', checkCompleted, projectIdChecker, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body)
    res.status(201).json(newAction)
  } catch (err) {
    next(err)
  }
})

router.use(handleError)

module.exports = router
