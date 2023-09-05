import book from './models/book.js'

async function main() {
  await book.create({
    title: 'Confessions',
    author: 'St. Augustine',
    isbn: '9780140441147',
  })

  const books = await book.all()
  console.log(books)
}

main()