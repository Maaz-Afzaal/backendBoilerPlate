const KafkaProducer = require('../kafka/Producer');
const {
	register,
	deleteUserRow,
	editChannelName,
} = require('../service/service');

const registerUser = async (req, res) => {
	const { name, email, channel, title } = req.body;
	if (name && email && channel && title) {
		try {
			const result = await register(req.body);
			// KafkaProducer.sendPayload(
			// 	{ ...result, time_stamp: Date.now(), event: 'demo-message' },
			// 	'video',
			// 	0,
			// );
			res.status(200).json({ data: result });
		} catch (error) {
			console.log(error);
			res.status(401).json({ error });
		}
	} else {
		res.status(402).json({ error: 'Incomplete data' });
	}
};

const deleteUser = async (req, res) => {
	// const { id } = req.params;
	// if (id) {
	try {
		const result = await deleteUserRow();
		res.status(200).json({ data: result });
	} catch (error) {
		console.log(error);
		res.status(401).json({ error });
	}
	// } else {
	// 	res.status(402).json({ error: 'Incomplete data' });
	// }
};

const editChannelNameInDB = async (req, res) => {
	const { id, name, videoName, videoId } = req.body;
	if (id && name && videoName && videoId) {
		try {
			const result = await editChannelName(req.body);
			res.status(202).json({ result: result });
		} catch (error) {
			console.log(error);
			res.status(402).json({ error: error });
		}
	} else {
		res.status(402).json({ error: 'Incomplete data' });
	}
};
module.exports = {
	registerUser: registerUser,
	deleteUser: deleteUser,
	editChannelNameInDB: editChannelNameInDB,
};
