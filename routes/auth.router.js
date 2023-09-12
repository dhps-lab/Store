const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthService = require('./../services/auth.service');
const service = new AuthService();


router.post('/login',
  passport.authenticate('local', { session: false}),
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
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const sentMail = await service.sendMail(email);
      res.json(sentMail);
    } catch (error) {
      next(error);
    }
  }
  /*
  - Crear servicio para las estrategias de logueo, sería auth.service.js
  - Agregar la lógica de la estrategía y del token que esta en el router
  - Se procede a crear la lógica de enviar el email con Nodemail

  * Reto:
  * encapsular las variables del email en variables de ambiente
  */
);

module.exports = router;
