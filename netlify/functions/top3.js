import mysql from 'mysql2/promise'

export const handler = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);	
	const query = ['Orange', 'Yellow', 'Purple', 'Red', 'Pink', 'Black', 'Blue', 'White', 'Green'].map(colour => `(SELECT Username, Colour, Score FROM Leaderboard WHERE Colour = "${colour}" ORDER BY Score DESC, Username LIMIT 3)`).join(' union all ');
	const [rows] = await connection.query(query);
	connection.end();
	
	let returnValue = {};
	
	rows.forEach(row => returnValue[row.Colour] = (returnValue[row.Colour] || []).concat({ Username: row.Username, Score: row.Score }));
	
	return {
		statusCode: 200,
		body: JSON.stringify(returnValue)
	}
}