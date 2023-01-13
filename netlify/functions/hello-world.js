import mysql from 'mysql2/promise'

export const handler = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);
	const [rows] = await connection.query('SELECT * FROM Leaderboard;');
	connection.end();
	
	return {
		statusCode: 200,
		body: JSON.stringify(rows)
	}
}