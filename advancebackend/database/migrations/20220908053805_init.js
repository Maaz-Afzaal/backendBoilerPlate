/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('users', (t) => {
			t.increments('u_id');
			t.string('name').notNullable();
			t.string('email').notNullable().unique();
			t.timestamps(true, true);
		})
		.createTable('channel', (t) => {
			t.increments('c_id');
			t.string('name').notNullable().unique();
			t.timestamps(true, true);
			t.integer('u_id')
				.references('u_id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		})
		.createTable('video', (t) => {
			t.increments('t_id');
			t.string('title').notNullable();
			t.integer('c_id')
				.references('c_id')
				.inTable('channel')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			t.timestamps(true, true);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('video')
		.dropTableIfExists('channel')
		.dropTableIfExists('users');
};
