
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.string('password').nullable().alter();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.string('password').notNullable().alter();
		})
	]);
};
