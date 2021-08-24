const express = require('express');

const devProjectController = require('../controllers/devProject.controller');

const router = express.Router();

// GET DEV PROJECTS
router.get('/getDevProjects', devProjectController.getDevProjects)

// GET PROJECT
//router.get('/devProject', devProjectController.getDevProject)

// POST PROJECT
router.post('/createDevProject', devProjectController.postDevProject)


module.exports = router