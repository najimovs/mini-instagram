import { Pool } from "pg"

const pool = new Pool({
	user: process.env.VITE_PG_USER,
	password: process.env.VITE_PG_PASSWORD,
	host: process.env.VITE_PG_HOST,
	port: Number(process.env.VITE_PG_PORT),
	database: process.env.VITE_PG_DBNAME,
})

export async function query(SQL, ...params) {
	const result = await pool.query(SQL, params)
	return result.rows
}

export const users = new Map()
