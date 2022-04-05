//COMPANIES ROUTES
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const isAuth = require('../middleware/isAuth');

const companyController = require('../controllers/company');

//GET ALL COMPANIES
router.get('/', isAuth, companyController.getCompanies);
//GET SINGLE COMPANY
router.get('/:companyId', isAuth, companyController.getCompany);

module.exports = router;
