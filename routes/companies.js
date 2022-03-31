//COMPANIES ROUTES
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const companyController = require('../controllers/company');
const isAuth = require('../middleware/isAuth');
const company = require('../models/company');

//GET ALL COMPANIES
router.get('/companies', isAuth, companyController.getCompanies);
//GET SINGLE COMPANY
router.get('/company', isAuth, companyController.getCompany);

module.exports = router;
