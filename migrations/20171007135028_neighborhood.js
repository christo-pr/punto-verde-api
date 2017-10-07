
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('neighborhoods', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('name');
		  table.string('sector_uuid').unsigned();
		  table.foreign('sector_uuid').references('sectors.uuid')
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('neighborhoods')
  ])
};
