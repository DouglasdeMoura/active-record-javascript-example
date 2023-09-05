import { AsyncDatabase } from 'promised-sqlite3'

const db = await AsyncDatabase.open(process.env.DATABASE_URL)

export default db
