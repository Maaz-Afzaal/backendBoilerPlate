/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table('channel', (t) => {
		t.integer('u_id').unique().alter();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table('channel', (t) => {
		t.dropUnique('u_id').alter();
	});
};
