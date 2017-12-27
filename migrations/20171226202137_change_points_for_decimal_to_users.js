
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.decimal('points').defaultTo(0.00).alter();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.integer('points').defaultTo(0).alter();
		})
	]);
};
