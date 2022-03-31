const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const companyController = require('../controllers/company');
const company = require('../models/company');

<<<<<<< HEAD
router.get('/companies', companyController.getCompanies); //, taskController.createTask 

router.get('/company/:companyId', companyController.getCompany); //, taskController.getTasks

// router.post('/companies/addcompany/:{companyId}', companyController.createCompany); //, taskController.getTasks

// router.put('/companies/updateCompany/:{companyId}', companyController.updateCompany); //, taskController.getTask

// router.delete('companies/deleteCompany/:{companyId}', company.deleteCompany); //, taskController.updateTask 
=======
router.get('/companies', companyController.getCompanies);

router.get('/company', companyController.getCompany);
>>>>>>> b1c1bd919eaf982242f69f5608b30de29c4ed1fb

module.exports = router;
