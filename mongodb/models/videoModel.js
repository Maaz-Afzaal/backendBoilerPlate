const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema(
	{
		videoId: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		comments: {
			type: Array,
		},
	},
	{ collection: 'video' },
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
