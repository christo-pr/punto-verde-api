
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('neighborhoods', function (table) {
		  table.integer('points').defaultTo(0);
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('neighborhoods', function (table) {
		  table.dropColumn('points');
		})
	]);
};
