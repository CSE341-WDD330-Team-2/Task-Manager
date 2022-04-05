//TASK CONTROLLER
const Task = require('../models/task');
const User = require('../models/user');
const Company = require('../models/company');

// PUT CREATE TASK
exports.createTask = (req, res, next) => {
   /**
    * STEP1: Pull data from body inputs and create variables
    * STEP2: Create new Task based on Task module and collected variables
    * STEP3: Save data into database
    * STEP4: Use createUserId to find User ID and find Company ID using found User ID
    * STEP5: Attach task to company
    * STEP6: Error handling
    */

   //STEP1
   const title = req.body.title;
   const description = req.body.description;
   const dueDate = req.body.due_date;
   const status = req.body.status;
   const creatorUserId = req.body.creator_user_id;
   const priority = req.body.priority;

   //STEP2
   const task = new Task({
      title: title,
      description: description,
      due_date: dueDate,
      status: status,
      creator_user_id: creatorUserId,
      priority: priority,
   });

   task
      .save() //STEP3
      .then((result) => {
         return User.findById(creatorUserId); //STEP4
      })
      .then((user) => {
         return Company.findOne({ employees: user }); //STEP4
      })
      .then((company) => {
         //STEP5
         company.tasks.push(task);
         return company.save();
      })
      //STEP6
      .then((result) => {
         res.status(201).json({
            message: 'Successfully added task',
         });
      })
      .catch((err) => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         err.message = 'Failed to process request';
         next(err);
      });
};

//GET ALL TASKS
exports.getTasks = (req, res, next) => {
   /**
    * STEP1: Search database for all tasks
    * STEP2: Create JSON code containing all Task info
    * STEP3: Error handling
    */

   Task.find() //STEP1
      .then((tasks) => {
         console.log(tasks);
         res.status(200).json({
            //STEP2
            tasks: tasks,
         });
      })
      .catch((err) => {
         //STEP3
         console.log(err);
      });
};

//GET SINGLE TASK
exports.getTask = (req, res, next) => {
   /**
    * STEP1: Create variable based on pulled from parameters
    * STEP2: Search database for task that has matching ID
    * STEP3: If found, create JSON data containing Task info
    * STEP4: Error handling
    */

   const taskId = req.params.taskId; //STEP1
   Task.findById(taskId) //STEP2
      .then((task) => {
         console.log(task);
         res.status(200).json({
            //STEP3
            task: task,
         });
      })
      .catch((err) => {
         //STEP4
         console.log(err);
      });
};

//PUT UPDATE TASK
exports.updateTask = (req, res, next) => {
   /**
    * STEP1: Using input from body and param of updating task ID, create variables
    * STEP2: Search Database for task based on task ID from parameter
    * STEP3: IF FOUND update database variable based on input variables from STEP1
    * STEP4: Save database
    * STEP5: Error handling
    */

   //STEP1
   const id = req.params.taskId;
   const title = req.body.title;
   const description = req.body.description;
   const status = req.body.status;
   const assignedTo = req.body.assigned_to;
   const priority = req.body.priority;

   Task.findById(id) //STEP2
      .then((task) => {
         if (!task) {
            //STEP5
            const error = new Error('Could not find task');
            error.statusCode = 404;
            throw error;
         }
         //STEP3
         task.title = title;
         task.description = description;
         task.status = status;
         task.assigned_to = assignedTo;
         task.priority = priority;
         return task.save(); //STEP4
      })
      .then((result) => {
         res.status(201).json({
            //STEP5
            message: 'Task updated succesfully',
            task: result,
         });
      })
      .catch((err) => {
         if (!err.statusCode) {
            //STEP5
            err.statusCode = 500;
         }
         next(err);
      });
};

exports.deleteTask = (req, res, next) => {
   /**
    * STEP1: Obtain task ID from parameter
    * STEP2: Search database for task with matching ID
    * STEP3: Find user who created task
    * STEP4: Find the company the user belongs to
    * STEP5: Remove task from company
    * STEP6: Remove the task
    * STEP7: Error hangling
    */

   const taskId = req.params.taskId; //STEP1

   Task.findById(taskId) //STEP2
      .then((task) => {
         if (!task) {
            const error = new Error('Could not find task');
            error.statusCode = 404;
            throw error;
         }
         const userId = task.creator_user_id;
         return User.findById(userId); //STEP3
      })
      .then((user) => {
         return Company.findOne({ employees: user }); //STEP4
      })
      .then((company) => {
         company.tasks.pull(taskId); //STEP5
         return company.save();
      })
      .then((result) => {
         return Task.findByIdAndDelete(taskId); //STEP6
      })
      .then((result) => {
         res.status(200).json({ message: 'Task successfully deleted' }); //STEP7
      })
      .catch((err) => {
         if (!err.statusCode) {
            //STEP7
            err.statusCode = 500;
         }
         next(err);
      });
};
