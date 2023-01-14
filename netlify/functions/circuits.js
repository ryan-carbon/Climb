import mysql from 'mysql2/promise'

export const handler = async () => {
	const connection = await mysql.createConnection(process.env.DATABASE_URL);	
	const query = "SELECT DISTINCT Circuit FROM Leaderboard ORDER BY Circuit"
	const [circuits] = await connection.query(query);
	connection.end();
	
	return {
		statusCode: 200,
		body: JSON.stringify(circuits)
	}
}