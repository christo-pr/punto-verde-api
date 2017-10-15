
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('neighborhood_scraps', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.decimal('scrap_kg');
		  table.string('scrap_uuid').unsigned();
		  table.string('neighborhod_uuid').unsigned();
		  table.foreign('scrap_uuid').references('scraps.uuid');
		  table.foreign('neighborhod_uuid').references('neighborhoods.uuid');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('neighborhood_scraps')
  ]);
};
