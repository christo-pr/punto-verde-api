
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('neighborhoods', function (table) {
		  table.boolean('active').defaultTo(false);
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('neighborhoods', function (table) {
		  table.dropColumn('active');
		})
	]);
};
