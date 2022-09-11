const router = require('express').Router();
const { checkToken } = require('../utilities/Validity');
require('dotenv').config();
const {
	createUser,
	login,
	refreshToken,
	activateUser,
	requestResetPassword,
	resetPassword,
	requestActivationLink,
} = require('../controllers/userController');

router.post('/signup', createUser);
router.post('/requestactivationlink', requestActivationLink);
router.post(
	'/activation',
	checkToken(process.env.USER_ACTIVATION_TOKEN_SECRET_KEY),
	activateUser,
);
router.post('/login', login);
router.get(
	'/refreshtoken',
	checkToken(process.env.REFRESH_TOKEN_SECRET_KEY),
	refreshToken,
);
router.post('/requestresetpassword', requestResetPassword);
router.post(
	'/resetpassword',
	checkToken(process.env.RESET_PASSWORD_TOKEN_SECRET_KEY),
	resetPassword,
);
module.exports = router;
