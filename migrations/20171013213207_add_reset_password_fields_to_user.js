
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.string('reset_password_token').defaultTo(null);
		  table.dateTime('reset_password_expires_at').defaultTo(null);
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  knex.schema.table('users', function (table) {
		  table.dropColumn('reset_password_token');
		  table.dropColumn('reset_password_expires_at');
		})
	]);
};
