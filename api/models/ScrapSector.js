"use strict";

const uuid = require('uuid/v1');

/**
 * ScrapSector
 * @description :: Model for storing ScrapSector records
 */

module.exports = {
  schema: true,

  tableName: 'scrap_sectors',

  attributes: {
    // Fill your attributes here
    scrapKg: {
    	type: 'float',
    	required: true,
    	columnName: 'scrap_kg'
    },

    scrap: {
    	model: 'scrap',
      columnName: 'scrap_uuid'
    },

    sector: {
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
