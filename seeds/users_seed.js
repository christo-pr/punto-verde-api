
const uuid = require('uuid/v1');
const faker = require('faker');
const HashService = require('../api/services/HashService');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let usersInserted = [];
  return knex('users').del()
    .then(() => {
      // // Inserts seed entries
      for (let i = 0; i < 100; i ++) {
        usersInserted.push({
          uuid: uuid(),
          name: faker.name.findName(),
          age: '30',
          role: 'regular',
          genre: 'men',
          email: faker.internet.exampleEmail(),
          password: HashService.bcrypt.hashSync('testing123')
        })
      }
      usersInserted.push({
        uuid: uuid(),
        name: 'Administrador',
        age: '30',
        role: 'admin',
        genre: 'men',
        email: 'admin@admin.com',
        password: HashService.bcrypt.hashSync('admin123')
      })

      return knex('users').insert(usersInserted);

    })
};
