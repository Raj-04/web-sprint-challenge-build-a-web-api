const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use('*', (req, res, next) => {
  next({
    status: 404,
    message: `${req.method} ${req.originalUrl} not found!`
  })
})

module.exports = server;
