const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
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
      const userFound = await UserModel.findOne({
        where: {
          email: user.email,
        }});
      const isSamePassword = await bcrypt.compare(user.password, userFound.password);

      delete userFound.password;

      if (isSamePassword) {
        const superPrivateSecretKey = 'serversecretkey';
        const token = jwt.sign({
          id: userFound.id,
          email: userFound.email,
        }, superPrivateSecretKey, { expiresIn: '2h' });

        res.json({
          token,
          userFound,
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