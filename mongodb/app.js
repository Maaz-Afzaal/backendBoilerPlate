const express = require('express');
const mongoose = require('mongoose');
const connection = require('./config/connection');
const { startConsumer } = require('./kafka/Consumer');
const { streamProcessor } = require('./kafka/StreamManager');

const videoModel = mongoose.model('Video');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
	const a = await consumer('video');
	console.log('a', a);
	// const a = await videoModel.find({});
	// console.log('a', a);
	if (a) {
		res.status(200).json({ result: a });
	} else {
		res.status(400).json({ error: 'not received' });
	}
});

app.post('/', async (request, response) => {
	const video = new videoModel(request.body);

	try {
		await video.save();
		response.send(video);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.listen(8082, () => {
	console.log('server started at 8082');
	startConsumer(streamProcessor, {
		topic: process.env.KAFKA_EVENT_TOPIC || 'video',
		group: process.env.KAFKA_AUTH_GROUP_ID || 'auth_id_maaz_2',
		client: process.env.KAFKA_AUTH_EVENT_CLIENT || 'auth_event_client_maaz',
	}).catch((err) => {
		console.error(`Kafka Consumer Error:${err}`);
		process.exit(1);
	});
});
