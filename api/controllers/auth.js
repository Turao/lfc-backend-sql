'use strict';

import jwt from 'jsonwebtoken';

import UserModel from '../models/user';
import UserController from './user';


class AuthController {
  async signup(req, res) {
    await UserController.create(req, res);
  }


  async login(req, res) {
    try {
      const { user } = req.body;
      const userFound = await UserModel.scope('withPassword').findOne({
        where: {
          email: user.email,
        },
      });
      const isSamePassword = userFound.verifyPassword(user.password)

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
      console.error(error);
      res.sendStatus(500); // internal error
    }
  }


  async authorize(req, res, next) {
    jwt.verify(req.headers.token, 'serversecretkey', (error, decoded) => {
      if (error) {
        res.sendStatus(401); // unauthorized access
      }
      else {
        // authorized
        req.session = {
          user: decoded
        };
        next();
      }
    })
  }

}

export default new AuthController();