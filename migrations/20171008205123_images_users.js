
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('images_users', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('user_uuid').unsigned();
		  table.string('image_uuid').unsigned();
		  table.foreign('user_uuid').references('users.uuid');
		  table.foreign('image_uuid').references('images.uuid');
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('images_users')
  ]);
};
