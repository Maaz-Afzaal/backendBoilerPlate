const con = require('../config/database');

module.exports = {
	create: (data, callBack) => {
		con.query(
			`insert into users(full_name,  email, password,is_active) values("${data.name}","${data.email}","${data.password}",false);
        select uid,full_name,email,is_active from users where email="${data.email}";
                `,
			(error, results) => {
				if (error) {
					callBack(error);
				} else if (results) {
					// console.log(results[1])
					return callBack(null, results[1][1]);
				}
			},
		);
	},
	checkUser: (email, callBack) => {
		con.query(
			`select uid,full_name,email,is_active from users where email="${email}"`,
			(error, result) => {
				if (error) {
					console.log(error);
					return callBack(error);
				} else if (result.length > 0) {
					return callBack(null, result[0]);
				} else {
					return callBack({ error: 'user not found' });
				}
			},
		);
	},
	getUserActivated: (email, callBack) => {
		con.query(
			`UPDATE users SET is_active=true WHERE email="${email}"`,
			(error, result) => {
				if (error) {
					return callBack(error);
				} else if (result) {
					// console.log(result);
					return callBack(null, result);
				}
			},
		);
	},
	resetUserPassword: (data, callBack) => {
		con.query(
			`UPDATE users SET password="${data.password}" WHERE email="${data.email}"`,
			(error, result) => {
				if (error) {
					return callBack(error);
				} else if (result) {
					return callBack(null, result);
				}
			},
		);
	},
	getUserByUserEmail: (email, callBack) => {
		con.query(
			`select * from users where email = "${email}"`,

			(error, results) => {
				if (error) {
					return callBack(error);
				} else if (!results || results.length == 0) {
					return callBack({ error: 'invalid user' });
				}
				return callBack(null, results[0]);
			},
		);
	},
};
