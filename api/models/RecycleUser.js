"use strict";

const uuid = require('uuid/v1');

/**
 * ScrapUser
 * @description :: Model for storing ScrapUser records
 */

module.exports = {
  schema: true,

  tableName: 'scrap_user',

  attributes: {
    // Fill your attributes here
    scrapKg: {
    	type: 'float',
    	required: true,
    	columnName: 'scrap_kg'
    },

    user: {
    	model: 'user',
      columnName: 'user_uuid'
    },

    scrap: {
    	model: 'scrap',
      columnName: 'scrap_uuid'
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

  afterCreate: (newlyRecords, next) => {
    User.addPoints({ userId: newlyRecords.user, points: parseFloat(newlyRecords.scrapKg)}, next)
  }
};
