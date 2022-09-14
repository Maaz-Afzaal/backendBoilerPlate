const { Model } = require('objection');
class User extends Model {
	static get tableName() {
		return 'users';
	}
	static get idColumn() {
		return 'u_id';
	}
	// static afterFind({ result }) {
	// 	console.log('this', result);
	// 	return result.filter((arr) => arr.u_id > 3);
	// }
	static modifiers = {
		defaultSelects(query) {
			query.where('u_id', '>', 3);
		},
	};
	// static get virtualAttributes() {
	// 	return ['nameAndEmail'];
	// }

	// nameAndEmail() {
	// 	return this.name + this.email;
	// }
	static get relationMappings() {
		const Channel = require('./channel');
		return {
			// video: {
			// 	relation: Model.HasOneThroughRelation,
			// 	modelClass: Video,
			// 	join: {
			// 		from: 'users.u_id',
			// 		through: {
			// 			from: 'channel.u_id',
			// 			to: 'channel.c_id',
			// 		},
			// 		to: 'video.c_id',
			// 	},
			// },
			channel: {
				relation: Model.HasOneRelation,
				modelClass: Channel,
				join: {
					from: 'users.u_id',
					to: 'channel.u_id',
				},
			},
		};
	}
}
module.exports = User;
