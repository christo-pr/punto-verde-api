
exports.up = function(knex, Promise) {
   return Promise.all([
	  knex.schema.createTable('images', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('url');
		  table.boolean('is_promoted');
		  table.date('expires_at');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('images')
  ]);
};
