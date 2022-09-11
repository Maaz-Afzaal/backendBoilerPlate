const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');

require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.json());

var corsOptions = {
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'DELETE', 'PATCH'],
	optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use('/api/auth', userRouter);

app.listen(port, () => {
	console.log('server up and running on PORT :', port);
});
