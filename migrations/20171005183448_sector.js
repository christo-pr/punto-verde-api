
exports.up = function(knex, Promise) {
	return Promise.all([
	  knex.schema.createTable('sectors', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('name');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('sectors')
  ])
};
