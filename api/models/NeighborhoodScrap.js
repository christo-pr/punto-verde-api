"use strict";

/**
 * NeighborhoodScrap
 * @description :: Model for storing NeighborhoodScrap records
 */

module.exports = {
  schema: true,

  attributes: {
    // Fill your attributes here
    scrapKg: {
    	type: 'float',
    	required: true,
    	columnName: 'scrap_kg'
    },

    neighborhood: {
    	model: 'neighborhood',
      columnName: 'neighborhood_uuid'
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
  beforeCreate: (values, next) => next()
};
