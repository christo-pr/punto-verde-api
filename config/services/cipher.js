"use strict";
module.exports = {
  services: {
    cipher: {
      jwt: {
        secretKey: `${process.env.JWT_SECRET_KEY}`,
        expiresIn: '24h'
      }
    }
  }
};
