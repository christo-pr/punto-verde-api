"use strict";

const uuid = require('uuid/v1');

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  tableName: 'users',

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    age: {
      type: 'integer'
    },

    genre: {
      type: 'string'
    },

    phone: {
      type: 'string'
    },

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      defaultsTo: null
    },

    address: {
      type: 'string'
    },

    role: {
      type: 'string',
      defaultsTo: 'regular'
    },

    points: {
      type: 'float',
      defaultsTo: 0.00
    },

    description: {
      type: 'string'
    },

    RFC: {
      type: 'string'
    },

    resetPasswordToken: {
      type: 'string',
      defaultsTo: null,
      columnName: 'reset_password_token'
    },

    resetPasswordExpiresAt: {
      type: 'datetime',
      defaultsTo: null,
      columnName: 'reset_password_expires_at'
    },

    // socialProfiles: {
    //   type: 'object',
    //   defaultsTo: {},
    //   columnName: 'social_profiles'
    // },

    sector:{
      model: 'sector',
      columnName: 'sector_uuid'
    },

    scraps: {
      collection: 'scrap',
      via: 'user',
      through: 'recycleuser'
    },

    assets: {
      collection: 'image',
      via: 'user',
      through: 'imageuser'

    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;
      delete obj.resetPasswordToken;
      delete obj.restPasswordExpiresAt;

      return obj;
    }
  },

  addPoints: (opts, next) => {
    let userId = opts.userId;
    let points = opts.points;

    if (!userId) return next(new Error('Please specify a user uuid'));
    User.findOne(userId)
      .then((user, err) => {
        if (err) return next(err);
        return user
      })
      .then( user => {
        user.points = parseFloat(user.points) + points;
        user.save().then((user, err) => {
          if(err) return next(err);
          return next();
        });
      });

  },

  beforeUpdate(values, next) {
    if (!values.password) return next();
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  },

  beforeCreate(values, next) {
    values.uuid = uuid();

    if (!values.password) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
