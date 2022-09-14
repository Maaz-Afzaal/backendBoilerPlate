const express = require('express');
// const { Kafka } = require('kafkajs');
const client = require('./config/postgressConfig');
const dbSetup = require('./database/db');
const User = require('./database/models/users');
const { startConsumer } = require('./kafka/Consumer');
const { streamProcessor } = require('./kafka/StreamManager');
// const createPartition = require('./kafka');
const router = require('./routes/router.js');
require('dotenv').config();

const port = process.env.ADVANCE_BACKEND_PORT || 8081;

dbSetup();
const app = express();

app.use(express.json());
app.use('/user', router);
app.get('/auth', async (req, res) => {
	try {
		// const { id } = req.params;
		const expand = req.query.expand;
		const user = await User.query()
			.withGraphFetched(expand)
			.modify('defaultSelects');
		res.status(200).json({ data: user });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e });
	}
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
	// startConsumer(streamProcessor, {
	// 	topic: process.env.KAFKA_EVENT_TOPIC || 'video',
	// 	group: process.env.KAFKA_AUTH_GROUP_ID || 'auth_id_maaz_1',
	// 	client: process.env.KAFKA_AUTH_EVENT_CLIENT || 'auth_event_client_maaz',
	// }).catch((err) => {
	// 	console.error(`Kafka Consumer Error:${err}`);
	// 	process.exit(1);
	// });
});
