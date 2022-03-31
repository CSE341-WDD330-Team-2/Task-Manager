const Task = require('../models/task');
const User = require('../models/user');
const Company = require('../models/company');

exports.createTask = (req, res, next) => {
    // req = req.req;
    const title = req.body.title;
    const description = req.body.description;
    // const dateCreated = req.body.created;
    const dueDate = req.body.due_date;
    const status = req.body.status;
    const creatorUserId = req.body.creator_user_id;
    const priority = req.body.priority;

    // Create a new task
    const task = new Task({
        title: title,
        description: description,
        // date_created: dateCreated,
        due_date: dueDate,
        status: status,
        creator_user_id: creatorUserId,
        priority: priority
    });
    // Save task
    task
        .save()
        // TODO: add user logic back in once users are in companies
        .then(result => {
            return User.findById(creatorUserId);
        })
        .then(user => {
            return Company.findOne({ employees: user });
            // return Company.findById("6242575c6eba12a30eec4946");
        })
        .then(company => {
            // Add task to company
            company.tasks.push(task);
            return company.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Successfully added task"
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.message = "Failed to process request";
            next(err);
        })
};

exports.getTasks = (req, res, next) => {
    Task.find()
    .then(tasks => {
      console.log(tasks);
        res.status(200).json({
            tasks: tasks,
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getTask = (req, res, next) => {
    const taskId = req.params.taskId;
    Task.findById(taskId)
    .then(task => {
      console.log(task);
        res.status(200).json({
            task: task,
        });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.updateTask = (req, res, next) => {
    const id = req.params.taskId;
    const title = req.body.title;
    const description = req.body.description;
    // const dateCreated = req.body.created;
    const status = req.body.status;
    const assignedTo = req.body.assigned_to;
    const priority = req.body.priority;

    Task.findById(id)
    .then(task => {
        if (!task) {
            const error = new Error('Could not find task');
            error.statusCode = 404;
            throw error;
        }
        task.title = title;
        task.description = description;
        task.status = status;
        task.assigned_to = assignedTo;
        task.priority = priority;
        return task.save();
    })
    .then(result => {
        res.status(201).json({
            message: "Task updated succesfully",
            task: result
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;

    Task.findById(taskId)
    .then(task => {
        if (!task) {
            const error = new Error('Could not find task');
            error.statusCode = 404;
            throw error;
        }
        const userId = task.creator_user_id;
        // find user who created task
        return User.findById(userId);
    })
    .then(user => {
        // find the company the user belongs to 
       return company.findOne({ employees: user });
    })
    .then(company => {
        // remove task from company
        company.tasks.pull(taskId);
        return company.save();
    })
    .then(result => {
        // remove the task
        return Task.findByIdAndDelete(taskId);
    })
    .then(result => {
        res.status(200).json({ message: "Task successfully deleted" });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
