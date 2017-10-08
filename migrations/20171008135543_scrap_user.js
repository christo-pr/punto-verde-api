
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('scrap_user', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.decimal('scrap_kg');
		  table.string('scrap_uuid').unsigned();
		  table.string('user_uuid').unsigned();
		  table.foreign('scrap_uuid').references('scraps.uuid');
		  table.foreign('user_uuid').references('users.uuid');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('scrap_user')
  ]);
};
