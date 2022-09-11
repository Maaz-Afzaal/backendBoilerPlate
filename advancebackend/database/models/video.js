const { Model } = require('objection');
class Video extends Model {
	static get tableName() {
		return 'video';
	}
	static get idColumn() {
		return 't_id';
	}
	static get relationMappings() {
		const User = require('./users');
		const Channel = require('./channel');
		return {
			channelVideo: {
				relation: Model.HasManyRelation,
				modelClass: Channel,
				join: {
					from: 'video.c_id',
					to: 'channel.c_id',
				},
			},
		};
	}
}

module.exports = Video;
