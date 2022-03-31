//AUTH ROUTES
const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/isAuth');
const User = require('../models/user');
const router = express.Router();
const authController = require('../controllers/auth');

//SIGN UP
router.put(
   '/signup',
   [
      body('email')
         .isEmail()
         .withMessage('Please enter a valid email.')
         .custom((value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
               if (userDoc) {
                  return Promise.reject('Email address exists already!');
               }
            });
         })
         .normalizeEmail(),
      body('password').trim().isLength({ min: 5 }),
      body('first_name').trim().not().isEmpty(),
      body('last_name').trim().not().isEmpty(),
   ],
   authController.signup
);
//LOG IN
router.post(
   '/login', 
   [
      body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
      body('password').trim().isLength({
         min: 5
      }),
      body('name').trim().not().isEmpty(),
   ],
   authController.login
);
//LOG OUT
router.put('/logout', isAuth, authController.logout);

module.exports = router;