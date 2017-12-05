"use strict";

const uuid = require('uuid/v1');
const _ = require('lodash');

/**
 * Sector
 * @description :: Model for storing Sector records
 */

module.exports = {
  schema: true,

  tableName: 'sectors',

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    neighborhoods: {
      collection: 'neighborhood',
      via: 'sector'
    },

    users: {
      collection: 'user',
      via: 'sector'
    },
    
    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),

  beforeCreate: (values, next) => {
  	values.uuid = uuid();
  	return next()
  },

  beforeDestroy: (criteria, next) => {
    Sector.findOne(criteria).populate('users')
      .exec( (err, sector) => {
        if (err) return next(err);

        User.destroy({ uuid:  _.map(sector.users, 'uuid') }).exec( (err) => { if (err) next(err) });
        next();
      })
  }
};
