const path = require('path');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
   if (!req.body.email || !req.body.password || !req.body.company) {
      res.status(400).send({ message: 'Cannot provide empty content!' });
      return;
   }
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const password = req.body.password;
   const company = req.body.company;

   bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
         const user = new User({
            email: email,
            password: hashedPw,
            first_name: first_name,
            last_name: last_name,
            company: company,
         });
         user
         .save()
         .then((data) => {
            res.status(201).send({
               message: 'Successfully created user!',
            })
         })
         .catch((err) => {
            res.status(500).send({
               message:
                  err.message || 'An error occurred while creating the user!',
            });
         });
      })
};

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   User.findOne({ email: email })
      .then((user) => {
         if (!user) {
            return res.status(422);
         }
         bcrypt
            .compare(password, user.password)
            .then((doMatch) => {
               if (doMatch) {
                  accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }); //This creates the JWT token
                  return res.status(200).json({ accessToken: accessToken });
               }
               return res.status(422);
            })
            .catch((err) => {
               console.log(err);
               return res.status(500);
            })
      })
      .catch((err) => {
         console.log(err);
         return res.status(500);
      });
};

exports.logout = (req, res, next) => {
   const authHeader = req.headers['authorization'];

   jwt.sign(authHeader, '', {expiresIn: 1}, (logout, err) => {
      if (logout) {
         res.status(201).send({
            message: 'You have been Logged Out.'
         });
      } else {
         res.status(400).send({
            message: 'Error!'
         });
      };
   })
};

