//TASK ROUTES
const express = require('express');
const { body } = require('express-validator'); //for validation purposes
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const taskController = require('../controllers/task');

//GET ALL TASK
router.get('/', isAuth, taskController.getTasks);
//GET SINGLE TASK
router.get('/:taskId', isAuth, taskController.getTask);
//CREATE TASK
router.post('/add-task', isAuth, taskController.createTask);
//UPDATE TASK
router.put('/:taskId', isAuth, taskController.updateTask);
//DELETE TASK
router.delete('/:taskId', isAuth, taskController.deleteTask);

module.exports = router;
