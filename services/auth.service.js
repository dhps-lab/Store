const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const config = require('../config/config');
const UserService = require('../services/user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password){
    try {
      const user = await service.findByEmail(email);
      if(!user){
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://mystore.com/recovery?token=${token}`;
    const updtaUser = await service.update(user.id, {recoveryToken: token});
    const mailInfo = {
      from: `"Big Brand " <${config.mailFrom}>`,
      to: `storeDuvTest2@yopmail.com, storeDuvTest@yopmail.com, ${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>This is a recovery mail, pleas follow this link => ${link}</b>`,
    };
    const rta = await this.sendMail(mailInfo);
    return rta;
  }

  async sendMail(mailInfo){
    const transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: true,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });
    const info = await transporter.sendMail(mailInfo);
    return { message: 'Mail sent'};
  }

}

module.exports = AuthService;
