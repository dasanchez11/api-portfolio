const express = require('express');
const aiProjectController = require('../controllers/aiProject.controller');

const router = express.Router();

//GET PROJECTS
router.get('/aiProjects',aiProjectController.getAiProjects)

//GET PROJECT
router.get('/:aiProjectId', aiProjectController.getAiProject)

//POST PROJECT
router.post('/createAiProject', aiProjectController.postAiProject)


module.exports = router;