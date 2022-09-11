const express = require('express');
const client = require('./config/postgressConfig');
const dbSetup = require('./database/db');
const User = require('./database/models/users');
const router = require('./routes/router.js');
dbSetup();

const app = express();
app.use(express.json());
app.use('/user', router);
app.get('/auth/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const expand = req.query.expand;
		const user = await User.query().withGraphFetched(expand);
		res.status(200).json({ data: user });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e });
	}
});

app.listen(8081, () => console.log('server running on port 8081'));
