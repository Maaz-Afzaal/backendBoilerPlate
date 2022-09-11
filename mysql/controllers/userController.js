const {
	create,
	getUserByUserEmail,
	checkUser,
	getUserActivated,
	resetUserPassword,
} = require('../services/userService');
const fs = require('fs');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
	generateAccessToken,
	generateRefreshToken,
	validateToken,
	generateResetPasswordToken,
	generateActivationToken,
} = require('../utilities/Authentication');
// const nodemailer = require('../../config/nodemailer');
const { isEmailValid } = require('../utilities/Validity');
module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		if (!body.name || !body.email || !body.password) {
			return res.status(401).json({
				success: 0,
				message: 'incomplete data',
			});
		}
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
			return res.status(402).json({
				success: 0,
				message: 'invalid email',
			});
		}
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);

		create(body, (err, result) => {
			if (err) {
				if (err.sqlMessage) {
					return res.status(402).json({
						success: 0,
						message: err.sqlMessage,
					});
				}
				return res.status(err.status).json({ message: err.message });
			}
			console.log(result);
			const activationToken = generateActivationToken(result.email);
			const { access_token, expiration_timestamp } =
				generateAccessToken(result);
			const refreshToken = generateRefreshToken(result);
			// nodemailer(result.email, 'signin up', `<b>${activationToken}</b>`);
			return res.status(200).json({
				user_id: result.uid,
				access_token: access_token,
				expiration_timestamp: expiration_timestamp,
				refresh_token: refreshToken,
				activation_token: activationToken,
			});
		});
	},
	requestActivationLink: (req, res) => {
		checkUser(req.body.email, (error, result) => {
			if (error) {
				return res.status(404).json({
					message: 'User not found',
				});
			} else if (result) {
				const activationToken = generateActivationToken(req.body.email);
				console.log('activation token', activationToken);
				// nodemailer(
				// 	`${req.body.email}`,
				// 	'signin up',
				// 	`<b>${activationToken}</b>`,
				// );
				return res.status(200).json({
					message: 'Activation link has been generated',
					activationToken,
				});
			}
		});
	},
	activateUser: (req, res) => {
		getUserActivated(req.decoded.user.email, (error, result) => {
			if (error) {
				return res.status(401).json({
					message: "User doesn't exist",
				});
			} else if (result) {
				return res.status(202).json({
					message: 'User has been activated successfuly',
				});
			}
		});
	},
	login: (req, res) => {
		const body = req.body;
		if (!body.email || !body.password) {
			return res.status(401).json({
				success: 0,
				message: 'Incomplete data',
			});
		}
		getUserByUserEmail(body.email, (error, results) => {
			if (error) {
				return res.status(404).json({
					success: 0,
					message: 'Invalid email or password',
				});
			} else if (results) {
				const isPasswordValid = compareSync(body.password, results?.password);
				if (isPasswordValid) {
					results.password = undefined;
					const { access_token, expiration_timestamp } =
						generateAccessToken(results);
					const refreshToken = generateRefreshToken(results);
					return res.status(200).json({
						user_id: results.uid,
						access_token: access_token,
						expiration_timestamp: expiration_timestamp,
						refresh_token: refreshToken,
					});
				} else {
					return res.status(404).json({
						success: 0,
						message: 'Invalid email or password',
					});
				}
			}
		});
	},
	refreshToken: (req, res) => {
		checkUser(req.decoded.user.email, (error, result) => {
			if (error) {
				return res.status(404).json({
					message: 'User not found',
				});
			} else if (result) {
				const { access_token, expiration_timestamp } = generateAccessToken(
					req.decoded.user,
				);
				return res.status(200).json({
					user_id: req.decoded.user.uid,
					access_token: access_token,
					expiration_timestamp: expiration_timestamp,
				});
			}
		});
	},
	requestResetPassword: (req, res) => {
		const email = req.body.email;
		if (isEmailValid(email)) {
			checkUser(email, (error, result) => {
				if (error) {
					return res.status(404).json({
						message: 'User not found',
					});
				} else if (result) {
					const resetPasswordToken = generateResetPasswordToken(email);
					nodemailer(
						email,
						'Reset Password link',
						`<b>${resetPasswordToken}</b>`,
					);
					return res.status(200).json({
						resetPasswordToken,
					});
				}
			});
		} else {
			return res.status(401).json({
				error: 'Email not valid',
			});
		}
	},
	resetPassword: (req, res) => {
		const email = req.decoded.user.email;
		const salt = genSaltSync(10);
		const password = hashSync(req.body.password, salt);
		resetUserPassword({ email, password }, (error, result) => {
			if (error) {
				res.status(404).json({
					error: 'User not found',
				});
			} else if (result) {
				res.status(201).json({
					message: 'Password reset Successfully',
				});
			}
		});
	},
};
