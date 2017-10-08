
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTable('users', function (table) {
		  table.string('uuid').primary();
		  table.specificType('id','serial');
		  table.string('name');
		  table.integer('age');
		  table.string('genre');
		  table.string('phone');
		  table.string('email');
		  table.string('password');
		  table.string('address');
		  table.enu('role', ['admin', 'regular', 'company']);
		  table.integer('points').defaultTo(0);
		  table.string('description').nullable().defaultTo(null);
		  table.string('RFC').nullable().defaultTo(null);
		  table.json('social_profiles').nullable().defaultTo(null);
		  table.string('sector_uuid').unsigned();
		  table.foreign('sector_uuid').references('sectors.uuid')
		  table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('users')
  ])
};
