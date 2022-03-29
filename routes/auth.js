const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/isAuth');

const User = require('../models/user');

const router = express.Router();

const authController = require('../controllers/auth');
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
   // isAuth, //This checks for a JWT token, should be used on all other routes like getting tasks/create company etc.
   authController.signup
);

router.post('/login', authController.login); // TODO: Add all the other User Request validation

router.post('/logout', authController.logout); // TODO: Add all the other User Request validation

module.exports = router;
