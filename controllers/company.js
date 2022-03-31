//COMPANY CONTROLLER
const Task = require('../models/task');
const User = require('../models/user');
const Company = require('../models/company');

//GET ALL COMPANIES
exports.getCompanies = (req, res, next) => {
  /**
   * STEP1: search companies
   * STEP2: create JSON list of all companies
   * STEP3: Error handling
   */

    Company.find() //STEP1
    .then(companies => {
        res.status(200).json({ //STEP2
            companies: companies,
        });
    })
    .catch(err => { //STEP3
      console.log(err);
    });
};

//GET SINGLE COMPANY
exports.getCompany = (req, res, next) => {
/**
 * STEP1: create variable of parameter involving company ID
 * STEP2: search Company Models based on parameter
 * STEP3: return JSON data of found company
 * STEP4: Error handling
 */

  const companyId = req.params.companyId; //STEP1
  Company.findById(companyId) //STEP2
  .then(company => {
    console.log(company);
      res.status(200).json({ //STEP3
          company: company,
      });
  })
  .catch(err => { //STEP4
    console.log(err);
  });
}