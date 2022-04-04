// Root routes put into server.js file, to match the swagger documentation path for each route,
// No prefix routes before login, signup, task, etc. 

const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/', require('./auth'));
router.use('/task', require('./task'));
router.use('/company', require('./companies'));

module.exports = router;
