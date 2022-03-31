const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const companyController = require('../controllers/company');
const company = require('../models/company');

router.get('/companies', companyController.getCompanies); //, taskController.createTask 

router.get('/company/:companyId', companyController.getCompany); //, taskController.getTasks

// router.post('/companies/addcompany/:{companyId}', companyController.createCompany); //, taskController.getTasks

// router.put('/companies/updateCompany/:{companyId}', companyController.updateCompany); //, taskController.getTask

// router.delete('companies/deleteCompany/:{companyId}', company.deleteCompany); //, taskController.updateTask 

module.exports = router;
