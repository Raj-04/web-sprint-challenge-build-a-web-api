const Projects = require('../projects/projects-model')
const { projectSchema } = require('../schemas')

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

async function projectIdChecker(req, res, next) {
  try {
    const project = await Projects.get(req.params.id || req.body.project_id)
    if(!project) {
      next({
        status: 404,
        message: 'project not found',
      })
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function validateProject(req, res, next) {
  try {
    const validated = await projectSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    })
    req.body = validated
    next()
  } catch (err) {
    next({
      status: 400, 
      message: err.message,
    })
  }
}

module.exports = {
  handleError,
  logger,
  projectIdChecker,
  validateProject,
}
