"use strict";

const uuid = require('uuid/v1');

/**
 * ImagesUsers
 * @description :: Model for storing ImagesUsers records
 */

module.exports = {
  schema: true,

  tableName: 'images_users',

  attributes: {
    // Fill your attributes here
    user: {
    	model: 'user',
    	columnName: 'user_uuid'
    },

    image: {
    	model: 'image',
    	columnName: 'image_uuid'
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
