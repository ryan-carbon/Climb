import mysql from 'mysql2/promise'

export const handler = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);	
	const query = ['Orange', 'Yellow', 'Purple', 'Red', 'Pink', 'Black', 'Blue', 'White', 'Green'].reduce((query, colour) => `${query} union all (select username, colour, score from Leaderboard where Colour = ${colour} order by score desc, username limit 3)`, '');
	const [rows] = await connection.query(query);
	connection.end();
	
	return {
		statusCode: 200,
		body: JSON.stringify(rows)
	}
}