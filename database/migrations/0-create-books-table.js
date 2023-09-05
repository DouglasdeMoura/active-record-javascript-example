import db from '../../src/config/db.js'

export const up = () => {
  const query = `
CREATE TABLE
  books (
    id INTEGER NOT NULL PRIMARY KEY autoincrement,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    isbn TEXT NOT NULL,
    updated_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`
  return db.run(query)
}

export const down = () => {
  const query = 'DROP TABLE IF EXISTS books;'

  return db.run(query)
}
