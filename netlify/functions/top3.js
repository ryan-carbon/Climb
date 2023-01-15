import mysql from 'mysql2/promise';

export const handler = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);	
	const query = ['Orange', 'Yellow', 'Purple', 'Red', 'Pink', 'Black', 'Blue', 'White', 'Green'].map(circuit => `(SELECT Username, Circuit, Score FROM Leaderboard WHERE Circuit = "${circuit}" ORDER BY Score DESC, Username LIMIT 3)`).join(' UNION ALL ');
	const [rows] = await connection.query(query);
	connection.end();

	let returnValue = {};
	rows.forEach(row => returnValue[row.Circuit] = (returnValue[row.Circuit] || []).concat({ Username: row.Username, Score: row.Score }));

	return {
		statusCode: 200,
		body: JSON.stringify(returnValue)
	};
};