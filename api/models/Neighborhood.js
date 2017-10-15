"use strict";

const uuid = require('uuid/v1');

/**
 * Neighborhood
 * @description :: Model for storing Neighborhood records
 */

module.exports = {
  schema: true,

	tableName: 'neighborhoods',

  attributes: {
    // Fill your attributes here
    name: {
    	type: 'string',
    	required: true
    },
    
    points: {
      type: 'integer',
      defaultsTo: 0
    },

    sector:{
    	model: 'sector',
    	columnName: 'sector_uuid'
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
