const express = require('express');
const { body } = require('express-validator'); //for validation purposes
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const taskController = require('../controllers/task');

router.get('/', isAuth, taskController.getTasks); //, taskController.getTasks

// TODO: Add validators back in
router.post(
    '/add-task',
    // [
    //     body('title')
    // ],
    taskController.createTask); //, taskController.createTask 

router.get('/task/:taskId', taskController.getTask); //, taskController.getTask

router.put('/:taskId', /*isAuth,*/ taskController.updateTask); //, taskController.updateTask 

router.delete('/:taskId', /*isAuth,*/ taskController.deleteTask); //, taskController.deleteTask 

// TODO: Add authentication for the task requests
module.exports = router;
