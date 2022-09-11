const mongoose = require('mongoose');
const uri = 'mongodb+srv://maaz:root@cluster0.byorw.mongodb.net/mongoPractice';
mongoose.connect(uri, { useNewUrlParser: true }, (e) => {
	if (e) {
		console.log('errr', e);
	} else {
		console.log('sucess');
	}
});

const video = require('../models/videoModel');
