
const uuid = require('uuid/v1');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sectors').del()
    .then(function () {
      // Inserts seed entries
      return knex('sectors').insert([
        {name: 'Sector-1', uuid: uuid()},
        {name: 'Sector-2', uuid: uuid()},
        {name: 'Sector-3', uuid: uuid()}
      ]);
    });
};
