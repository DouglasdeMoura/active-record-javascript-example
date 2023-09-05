import db from '../../src/config/db.js'

export const up = () => {
  const query = `
  INSERT INTO
    books (author, title, isbn)
  
  VALUES
    ('Homer', 'The Odissey', '9788403870154'),
    ('Homer', 'Iliad', '9780140440515'),
    ('Virgil', 'Aeneid', '9780140440515');
  `

  return db.run(query)
}

export const down = () => {
  const query = 'DELETE FROM books;'

  return db.run(query)
}
