const { Model } = require('objection');
class Channel extends Model {
	static get tableName() {
		return 'channel';
	}
	static get idColumn() {
		return 'c_id';
	}
	static get relationMappings() {
		const User = require('./users');
		const Video = require('./video');
		return {
			video: {
				relation: Model.HasManyRelation,
				modelClass: Video,
				join: {
					from: 'channel.c_id',
					to: 'video.c_id',
				},
			},
			user: {
				relation: Model.HasOneRelation,
				modelClass: User,
				join: {
					from: 'channel.u_id',
					to: 'users.u_id',
				},
			},
		};
	}
}

module.exports = Channel;
