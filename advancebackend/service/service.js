const Channel = require('../database/models/channel');
const User = require('../database/models/users');

const register = async (data) => {
	const { name, email, channel, title } = data;
	// const transaction = await User.transaction(async (trx) => {
	// 	const user = await User.query(trx).insert({
	// 		name,
	// 		email,
	// 	});
	// 	const qu = await user.$relatedQuery('channel', trx).insert({
	// 		name: channel,
	// 	});
	// 	const addVideo = await qu.$relatedQuery('video', trx).insert(
	// 		title?.map((video) => {
	// 			return {
	// 				title: video,
	// 			};
	// 		}),
	// 	);
	// 	return addVideo;
	// });
	// return transaction;
	const user = User.query().insertGraph({
		name,
		email,
		channel: {
			name: channel,
			video: title?.map((vid) => {
				return {
					title: vid,
				};
			}),
		},
	});
	return user;
};

const editChannelName = async (data) => {
	const { id, name, videoName, videoId } = data;
	const transaction = await User.transaction(async (trx) => {
		const user = await User.query(trx).findById(id);
		const editChannelName = await user
			.$relatedQuery('channel', trx)
			.patch({
				name: name,
			})
			.returning('*')
			.first();
		const editVideoTitle = await Channel.relatedQuery('video', trx)
			.for(editChannelName.c_id)
			.findById(videoId)
			.patch({
				title: videoName,
			});
		return editVideoTitle;
	});
	return transaction;
};

const deleteUserRow = async (id) => {
	// const trx = await User.startTransaction();
	const del = await User.query().where('u_id', '>', 3).delete();
	// .delete()
	// .where('u_id', '>', 3)
	// .joinRelation('channel')
	// .delete();
	return del;
};
module.exports = {
	register: register,
	deleteUserRow,
	editChannelName,
};
