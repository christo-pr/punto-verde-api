
exports.up = function(knex, Promise) {
	return Promise.all([
	  knex.schema.createTable('sectors', function (table) {
		  table.increments();
		  table.uuid('uuid');
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
