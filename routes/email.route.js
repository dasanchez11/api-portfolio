const express = require('express');
const emailController= require('../controllers/email.controller');

const router = express.Router();

//POST EMAIL
router.post('/sendEmail', emailController.sendEmail)


module.exports = router