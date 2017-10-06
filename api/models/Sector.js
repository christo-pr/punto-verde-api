"use strict";

const uuid = require('uuid/v1');

/**
 * Sector
 * @description :: Model for storing Sector records
 */

module.exports = {
  schema: true,

  tableName: 'sectors',

  autoCreatedAt: false,

 	autoUpdatedAt: false,

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    uuid: {
    	type: 'text'
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
