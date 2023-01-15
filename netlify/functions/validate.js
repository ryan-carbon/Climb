import fetch from 'node-fetch';

exports.handler = async (event, context) => {
	const { identity, user } = context.clientContext;
	const usersUrl = `${identity.url}/admin/users?filter=${encodeURIComponent(JSON.parse(event.body).user.user_metadata.full_name)}`;
	const data = await fetch(usersUrl, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + identity.token },
	}).then(res => res.json())

	let returnValue = {
		body: event.body,
		data: data,
		identityUrl: identity.url,
		token: identity.token
	};
	
	return {
		statusCode: (data.users.length > 0 ? 400 : 200),
		body: JSON.stringify(returnValue)
	};
};