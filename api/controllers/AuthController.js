"use strict";

const async = require('async')
const crypto = require('crypto');
const moment = require('moment')

/**
 * AuthController
 * @description :: Server-side logic for manage users' authorization
 */

const _ = require('lodash');
const passport = require('passport');

module.exports = {
  /**
   * Sign in by email\password
   * @param req
   * @param res
   */
  signin(req, res) {
    passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Sign up by email\password
   * @param req
   * @param res
   */
  signup(req, res) {
    const values = _.omit(req.allParams(), 'id');

    User
      .create(values)
      .then(user => {
        return {token: CipherService.jwt.encodeSync({id: user.id}), user: user}
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  /**
   * Authorization via social networks
   * @param req
   * @param res
   */
  social(req, res) {
    const type = req.param('type') ? req.param('type').toLowerCase() : '-';
    const strategyName = [type, 'token'].join('-');

    if (Object.keys(passport._strategies).indexOf(strategyName) === -1) {
      return res.badRequest(null, {message: [type, ' is not supported'].join('')});
    }

    passport.authenticate('jwt', (error, user, info) => {
      req.user = user;
      passport.authenticate(strategyName, _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
    })(req, res);
  },

  /**
   * Accept JSON Web Token and updates with new one
   * @param req
   * @param res
   */
  refresh_token(req, res) {
    if (!req.param('token')) return res.badRequest(null, {message: 'You must provide token parameter'});

    const oldDecoded = CipherService.jwt.decodeSync(req.param('token'));

    res.ok({
      token: CipherService.jwt.encodeSync({id: oldDecoded.id})
    });
  },

  /**
   * Logic to handle the forgot password process
   * @param req
   * @param res
   */
  forgot_password(req, res) {
    async.waterfall([
      (next) => {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          next(err, token);
        });
      },
      (token, next) => {
        if(!req.body.email) return res.badRequest(null, {message: 'You must provide a valid email'})
        User.findOne()
            .where({ email: req.body.email })
            .then( user => {
              if(!user) return res.notFound()

              user.resetPasswordToken = token;
              user.resetPasswordExpiresAt = moment().add(1, 'hours').format(); // 1 hour from current time

              user.save( err => {
                next(err, token, user);
              });
            })
      },
      (token, user, next) => {
        let mailOptions = {
          to: user.email,
          subject: 'Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        MailerService.send(mailOptions).then( response => next(response))
      }
    ], (response) => { 
      if (response.message != 'success') res.serverError();
      res.ok();
    })
  },

  /**
   * Logic to handle the reset password
   * @param req
   * @param res
   */
  reset_password(req, res) {
    User.findOne()
        .where({ resetPasswordToken: req.params.token, resetPasswordExpiresAt: { '>': moment().format() } })
        .then( user => {
          if(!user) return res.badRequest(null, {message: 'Password reset token is invalid or has expired.'})
          user.password = req.body.password;
          user.resetPasswordToken = null;
          user.resetPasswordExpiresAt = null;
          req.body.email = user.email;
          user.save( err => {
            if (err) return res.serverError();
            this.signin(req, res);
          })
        })
  }
}
