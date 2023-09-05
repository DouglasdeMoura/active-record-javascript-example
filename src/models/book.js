import { object, string, optional } from 'valibot'

import { ActiveRecord } from '../interfaces/active-record.js'

const BookCreateSchema = object({
  author: string(),
  title: string(),
  isbn: string(),
})

const BookUpdateSchema = optional(BookCreateSchema)

export class Book extends ActiveRecord {
  constructor() {
    super({
      tableName: 'books',
      validators: {
        create: BookCreateSchema,
        update: BookUpdateSchema,
      }
    })
  }
}

export default new Book()
