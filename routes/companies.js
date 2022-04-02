const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const companyController = require('../controllers/company');

router.get('/companies', isAuth, companyController.getCompanies);

router.get('/company', isAuth, companyController.getCompany);

module.exports = router;
