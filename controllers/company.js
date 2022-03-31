const Task = require('../models/task');
const User = require('../models/user');
const Company = require('../models/company');


exports.getCompanies = (req, res, next) => {
    Company.find()
    .then(companies => {
        res.status(200).json({
            companies: companies,
        });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getCompany = (req, res, next) => {
    const companyId = req.params.companyId;
    Company.findById(companyId)
    .then(company => {
      console.log(company);
        res.status(200).json({
            company: company,
        });
    })
    .catch(err => {
      console.log(err);
    });
}