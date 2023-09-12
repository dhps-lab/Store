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

  async sendMail(email){
    //Validate user and put in message
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: true,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });
    const info = await transporter.sendMail({
      from: `"Fred Foo 👻" <${config.mailFrom}>`, // sender address
      to: `storeDuvTest2@yopmail.com, storeDuvTest@yopmail.com, ${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "This is a message to recover your account", // plain text body
      html: "<b>This is a recovery mail</b>", // html body
    });
    return { message: 'Mail sent'};
  }

}

module.exports = AuthService;
