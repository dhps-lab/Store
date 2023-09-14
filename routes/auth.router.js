const express = require('express');
const passport = require('passport');
const router = express.Router();

const { logInSchema, recoverySchema, changePasswordSchema } = require('./../schemas/auth.schema');
const AuthService = require('./../services/auth.service');
const service = new AuthService();


router.post('/login',
  passport.authenticate('local', { session: false}),
  validatorHandler(logInSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { newPassword, token } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
