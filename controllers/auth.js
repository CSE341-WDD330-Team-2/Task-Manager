//AUTH CONTROLLER
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // JWT Academind Video: https://pro.academind.com/courses/767386/lectures/13902439
const User = require('../models/user');
const Company = require('../models/company');
const { validationResult } = require('express-validator');
const task = require('../models/task');

exports.signup = (req, res, next) => {
   /**
    * STEP1: check if body inputs are empty or not
    * STEP2: Validate input (if works with front end validation as well)
    * STEP3: Make variables out of all inputs individually
    * STEP4: Encrypt Password
    * STEP5: Plug input variable into variables of new User model
    * STEP6: Save new User model and all inputted variables
    * STEP7: Add new User to designated company,
    * STEP7a: If company doesn't exist, create new Company model
    * STEP8: Error Checking
    */
   console.log(''); //This allows all the documentation above to be compacted

   //STEP1
   if (!req.body.email || !req.body.password || !req.body.company) {
      res.status(400).send({ message: 'Cannot provide empty content!' });
      return;
   }

   //STEP2
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
   }

   //STEP3
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const password = req.body.password;
   const company = req.body.company;

   //STEP4
   bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
         //STEP5
         const user = new User({
            email: email,
            password: hashedPw,
            first_name: first_name,
            last_name: last_name,
            company: company,
         });
         return user.save(); //STEP6
      })
      .then((data) => {
         // TODO: Delete this, it's only for testing purposes
         Company.findOne({ company_name: company }) //STEP7
            .then((comp) => {
               console.log(comp);
               let new_company;
               if (!comp) {
                  //STEP7a
                  new_company = new Company({
                     company_name: company,
                     logo: 'https://www.southcharlottefamilycounseling.com/wp-content/uploads/2015/10/cropped-logo-dummy.png',
                     employees: [
                        data._id, // Potentially import mongoose id??
                     ],
                     tasks: [],
                  });
               } else {
                  //STEP7
                  new_company = comp;
                  user_array = new_company.employees;
                  user_array.push(data._id);
                  new_company.employees = user_array;
               }
               console.log(new_company);
               return new_company.save();
            })
            //STEP8
            .catch((err) => {
               res.status(500).send({
                  message:
                     err.message ||
                     'An error occurred while creating the company!',
               });
            });
         res.status(201).send(data._id); // Change this to return something else???
      })
      .catch((err) => {
         //STEP8
         res.status(500).send({
            message:
               err.message || 'An error occurred while creating the user!',
         });
      });
};

exports.login = (req, res, next) => {
   /**
    * STEP1: Create variables from body input
    * STPE2: Search User models for one with matching email
    * STEP3: Copmpare input password with database password
    * STEP4: If match, create accessToken
    * STEP5: Error Handling
    */

   //STEP1
   const email = req.body.email;
   const password = req.body.password;

   //STEP2
   User.findOne({ email: email })
      .then((user) => {
         if (!user) {
            return res.status(422);
         }
         bcrypt
         //STEP3
         .compare(password, user.password)
         .then((doMatch) => {
               if (doMatch) {
                  //STEP4
                  accessToken = jwt.sign(
                     { user },
                     process.env.ACCESS_TOKEN_SECRET,
                     { expiresIn: '1h' }
                  ); //This creates the JWT token
                  return res.status(200).json({
                     accessToken: accessToken,
                     user_id: user._id,
                  });
               } else {
                  res.status(422).send({
                     message: 'Invalid Credentials!'
                  });
               }
            })
            //STEP5
            .catch((err) => {
               console.log(err);
               return res.status(500);
            });
      })
      //STEP5
      .catch((err) => {
         console.log(err);
         return res.status(500);
      });
};

exports.logout = (req, res, next) => {
   /**
    * STEP1: Get 'authorization' from headers
    * STEP2: Set to expire so user is signed out
    * STEP3: Error checking
    */

   //STEP1
   const authHeader = req.headers['authorization'];

   //STEP2
   jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
      if (logout) {
         res.status(201).send({
            message: 'You have been Logged Out.',
         });
      } else {
         //STEP3
         res.status(400).send({
            message: 'Error!',
         });
      }
   });
};

exports.getUser = (req, res, next) => {
   const userId = req.params.userId;
   User.findById(userId)
      .then((user) => {
         console.log(user);
         res.status(200).json({
            user: user,
         });
      })
      .catch((err) => {
         console.log(err);
      });
};
