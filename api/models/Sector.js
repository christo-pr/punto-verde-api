"use strict";

const uuid = require('uuid/v1');

/**
 * Sector
 * @description :: Model for storing Sector records
 */

module.exports = {
  schema: true,

  tableName: 'sectors',

  autoCreatedAt: true,

 	autoUpdatedAt: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    uuid: {
    	type: 'text'
    },

    createdAt: {
      type: 'datetime',
      defaultsTo: null,
      columnName: 'created_at'
    },

    updatedAt: {
      type: 'datetime',
      defaultsTo: null,
      columnName: 'updated_at'
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
