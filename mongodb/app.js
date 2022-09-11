const express = require('express');
const mongoose = require('mongoose');
const connection = require('./config/connection');
const videoModel = mongoose.model('Video');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
	const a = await videoModel.find({});
	console.log('a', a);
	res.status(200).json({ result: a });
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
});
