const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const companyController = require('../controllers/company');
const company = require('../models/company');


router.get('/companies', isAuth, companyController.getCompanies);

router.get('/company', isAuth, companyController.getCompany);

module.exports = router;
