const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const companyController = require('../controllers/company');
const company = require('../models/company');

router.get('/companies', companyController.getCompanies);

router.get('/company', companyController.getCompany);

module.exports = router;
