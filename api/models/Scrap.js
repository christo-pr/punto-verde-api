"use strict";

const uuid = require('uuid/v1');

/**
 * Scrap
 * @description :: Model for storing Scrap records
 */

module.exports = {
  schema: true,

  tableName: 'scraps',

  attributes: {
    // Fill your attributes here
    name: {
    	type: 'string',
    	required: true
    },

    valuePerKg: {
    	type: 'float',
    	required: true,
    	columnName: 'value_per_kg'
    },

    users: {
    	collection: 'user',
    	via: 'scrap',
    	through: 'scrapuser'
    },

    neighborhoods: {
      collection: 'neighborhood',
      via: 'scrap',
      through: 'neighborhoodscrap'
    },

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => {
  	values.uuid = uuid();
  	return next()
  }
};
