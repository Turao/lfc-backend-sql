'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models/');
const UserModel = models.user;
const UserController = require('./user-controller');

const AuthController = {
  signup: async (req, res) => {
    try {
      const { user } = req.body;
      const hash = await bcrypt.hash(user.password, 10);
      req.body.user.password = hash;
      UserController.create(req, res);
    } catch (error) {
      res.sendStatus(500); // internal error
    }
  },

  login: async (req, res) => {
    try {
      const { user } = req.body; 
      const userFound = await UserModel.scope('withPassword').findOne({
        where: {
          email: user.email,
        },
      });
      const isSamePassword = await bcrypt.compare(user.password, userFound.password);

      // do not send the password back to the user!
      userFound.password = undefined;

      if (isSamePassword) {
        const superPrivateSecretKey = 'serversecretkey';
        const token = jwt.sign({
          id: userFound.id,
          email: userFound.email,
        }, superPrivateSecretKey, { expiresIn: '2h' });

        res.json({
          token,
          user: userFound,
        })
      } else {
        res.sendStatus(401); // unauthorized access
      }
    } catch (error) {
      res.sendStatus(500); // internal error
    }
  },

  authorize: async (req, res, next) => {
    jwt.verify(req.headers.token, 'serversecretkey', (error) => {
      if (error) {
        res.sendStatus(401); // unauthorized access
      }
      else {
        // authorized
        next();
      }
    })
  },

};

module.exports = AuthController;