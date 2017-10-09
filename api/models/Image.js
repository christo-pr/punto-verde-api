"use strict";

const uuid = require('uuid/v1');

/**
 * Images
 * @description :: Model for storing Images records
 */

module.exports = {
  schema: true,

  tableName: 'images',

  attributes: {
    // Fill your attributes here
    src: {
    	type: 'string',
    	required: true,
    	columnName: 'url'
    },
    isPromoted: {
    	type: 'boolean',
    	defaultsTo: false,
    	columnName: 'is_promoted'
    },

    expiresAt:{
    	tpye: 'date',
    	defaultsTo: null,
    	columnName: 'expires_at'
    },

    users:{
    	collection: 'user',
    	via: 'image',
    	through: 'imageuser'
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
