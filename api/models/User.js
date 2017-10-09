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
      type: 'integer',
      defaultsTo: 0
    },

    description: {
      type: 'string'
    },

    RFC: {
      type: 'string'
    },

    socialProfiles: {
      type: 'object',
      defaultsTo: {},
      columnName: 'social_profiles'
    },

    sector:{
      model: 'sector',
      columnName: 'sector_uuid'
    },

    scraps: {
      collection: 'scrap',
      via: 'user',
      through: 'scrapuser'
    },

    assets: {
      collection: 'image',
      via: 'user',
      through: 'imageuser'

    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;
      delete obj.socialProfiles;

      return obj;
    }
  },

  beforeUpdate(values, next) {
    if (false === values.hasOwnProperty('password')) return next();
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

    if (false === values.hasOwnProperty('password')) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
