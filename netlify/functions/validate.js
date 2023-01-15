import fetch from 'node-fetch';

exports.handler = async (event, context) => {
	const { identity, user } = context.clientContext;
	const usersUrl = `${identity.url}/admin/users?filter=${encodeURIComponent(JSON.parse(event.body).user.name)}`;
	const data = await fetch(usersUrl, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + identity.token },
	}).then(res => res.json())

	return {
		statusCode: (data.users.length > 0 ? 400 : 204)
	};
};