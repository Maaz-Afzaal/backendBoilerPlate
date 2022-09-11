/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex.raw('TRUNCATE TABLE "users" CASCADE');
	await knex.raw('TRUNCATE TABLE "channel" CASCADE');
	await knex.raw('TRUNCATE TABLE "video" CASCADE');

	await knex('users').insert([
		{
			u_id: 1,
			name: 'user1',
			email: 'user1@mail.com',
		},
		{
			u_id: 2,
			name: 'user2',
			email: 'user2@mail.com',
		},
		{
			u_id: 3,
			name: 'user3',
			email: 'user3@mail.com',
		},
	]);
	await knex('channel').insert([
		{
			c_id: 1,
			name: 'channel1',
			u_id: 1,
		},
		{
			c_id: 2,
			name: 'channel2',
			u_id: 2,
		},
	]);
	await knex('video').insert([
		{
			c_id: 2,
			title: 'title1',
			c_id: 2,
		},
		{
			c_id: 2,
			title: 'title2',
			c_id: 2,
		},
	]);

	await knex.raw(
		'SELECT setval(\'"users_u_id_seq"\', (SELECT max(u_id) from "users"))',
	);
	await knex.raw(
		'SELECT setval(\'"channel_c_id_seq"\', (SELECT max(c_id) from "channel"))',
	);
	await knex.raw(
		'SELECT setval(\'"video_t_id_seq"\', (SELECT max(t_id) from "video"))',
	);
};
