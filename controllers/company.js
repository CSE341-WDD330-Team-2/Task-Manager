// exports.getAllCompanies = (req, res, next) => {
//   console.log(company.name);
//   User.find()
//   .then(company =>{
//       res.status(200).json({
//           company: company
//   });

//           // content: req.userId }]
//   });
// };

// exports.getCompany = (req, res, next) => {
//   console.log(req.params.id, "16");
//   company.findById(req.params.id)
//   .then(company =>{
//       console.log(company, "19");
//       res.status(200).json({
//           company: company._id
//   });

//           // content: req.userId }]
//   });
// };

// exports.postCompany = (req, res, next) => {
//   res.status(200).json({
//       posts: [{ title: 'company', content: 'This is the company endpoint' }]
//   });
// };

// exports.putCompany = (req, res, next) => {
//   res.status(200).json({
//       posts: [{ title: 'company', content: 'This is the company endpoint' }]
//   });
// };

// exports.deleteCompany = (req, res, next) => {
//   res.status(200).json({
//       posts: [{ title: 'company', content: 'This is the company endpoint' }]
//   });
// };


const Task = require('../models/task');
const User = require('../models/user');
const Company = require('../models/company');

exports.createCompany = (req, res, next) => {
    // req = req.req;
    const company_name = req.body.company_name;
    const logo = req.body.logo;
    // const dateCreated = req.body.created;
    const employees = req.body.employees;
    const tasks = req.body.tasks;

    // Create a new task
    const company = new Company({
        company_name: company_name,
        logo: logo,
        employees: employees,
        tasks: tasks,
    });
    // Save task
    company
        .save()
        // TODO: add user logic back in once users are in companies
        // .then(result => {
        //     return User.findById(creatorUserId);
        // })
        .then(user => {
            // return Company.findOne({ employees: user });
            return Company.findById("6242575c6eba12a30eec4946");
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

exports.getCompany = (req, res, next) => {
    Task.find()
    .then(companies => {
      console.log(companies);
        res.status(200).json({
            companies: companies,
        });
    })
    .catch(err => {
      console.log(err);
    });
};
