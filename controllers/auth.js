const path = require('path');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// TODO: Add other user logic here and in the user.js route
exports.signup = (req, res, next) => {
   // This probably needs to be converted to 'signup'.
   if (!req.body.email || !req.body.password || !req.body.company) {
      res.status(400).send({ message: 'Cannot provide empty content!' });
      return;
   }
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const password = req.body.password; 
   // bcrypt.hash(req.body.password, 12); // TODO: change this to "Hashed Password, once that's implemented"
   const company = req.body.company;
   bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
         const user = new User({
            email: email,
            password: hashedPw, // TODO: change this to "Hashed Password, once that's implemented"
            first_name: first_name,
            last_name: last_name,
            company: company,
         });
         // return user.save();
         user
         .save()
         .then((data) => {
            console.log(data); // TODO: Delete this, it's only for testing purposes
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
   // const user = new User(userObject);
 
   // Create token
   // const token = jwt.sign(
   //    { user_id: user._id, email },
   //    process.env.TOKEN_KEY,
   //    {
   //      expiresIn: "2h",
   //    }
   //  );
   //  // save user token
   //  user.token = token;
   // accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET) //This creates the JWT token
   // res.json({ accessToken: accessToken })

   // user
   //    .save()
   //    .then((data) => {
   //       console.log(data); // TODO: Delete this, it's only for testing purposes
   //       res.status(201).send({
   //          message: 'Successfully created user!',
   //       })
   //    })
   //    .catch((err) => {
   //       res.status(500).send({
   //          message:
   //             err.message || 'An error occurred while creating the user!',
   //       });
   //    });
};

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   User.findOne({ email: email })
      .then((user) => {
         if (!user) {
            return res.status(422)
            // .render('auth/login', {
            //    path: '/login',
            //    pageTitle: 'Login',
            //    errorMessage: 'Invalid email or password.',
            //    oldInput: {
            //       email: email,
            //       password: password,
            //    },
            //    // validationErrors: []
            // });
         }
         bcrypt
            .compare(password, user.password)
            .then((doMatch) => {
               if (doMatch) {
                  // req.session.isLoggedIn = true;
                  // req.session.user = user;
                  // return req.session.save(err => {
                  //   console.log(err);
                  // res.redirect('/');
                  // });
                  accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET) //This creates the JWT token

                  return res.status(200).json({ accessToken: accessToken })
               }
               return res.status(422)
               // .render('/login', {
               //    path: '/login',
               //    pageTitle: 'Login',
               //    errorMessage: 'Invalid email or password.',
               //    oldInput: {
               //       email: email,
               //       password: password,
               //    },
               //    // validationErrors: []
               });
            })
            .catch((err) => {
               console.log(err);
               return res.status(500);
            });
      // })
      // .catch((err) => {
      //    const error = new Error(err);
      //    error.httpStatusCode = 500;
      //    return next(error);
      // });
};

exports.logout = (req, res, next) => {
   // accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET) //This creates the JWT token

   // res.status(200).json({ accessToken: accessToken })

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
   // res.redirect('/')
};

