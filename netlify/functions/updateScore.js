import mysql from 'mysql2/promise';

exports.handler = async (event, context) => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);	
	const { identity, user } = context.clientContext;
	const usersUrl = `${identity.url}/admin/users?filter=${encodeURIComponent(JSON.parse(event.body).user.user_metadata.full_name)}`;
	const data = await fetch(usersUrl, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + identity.token },
	}).then(res => res.json())

	if (data.users.length > 0) {
		return {
			statusCode: 400,
			message: JSON.stringify({ msg: "Username already taken" });
		};
	}
	else {
		return {
			statusCode: 200
		};
	}
};