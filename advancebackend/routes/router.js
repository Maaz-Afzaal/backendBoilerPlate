const router = require('express').Router();

const {
	registerUser,
	deleteUser,
	editChannelNameInDB,
} = require('../controller/controller.js');

router.post('/register', registerUser);
router.delete('/delete/:id', deleteUser);
router.patch('/edit', editChannelNameInDB);

module.exports = router;
