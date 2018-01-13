
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('scraps', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('name').unique();
		  table.decimal('value_per_kg');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('scraps')
  ])
};
