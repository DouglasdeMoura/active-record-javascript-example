import { parse } from 'valibot'

import db from '../config/db.js'

export class ActiveRecord {
  constructor({ database = db, tableName, validators }) {
    this.database = database
    this.tableName = tableName
    this.validators = validators
  }

  all(columns = '*') {
    const cols = Array.isArray(columns) ? columns.join(', ') : columns

    return this.database.all(`SELECT ${cols} FROM ${this.tableName}`)
  }

  async findById(id, columns = '*') {
    const cols = Array.isArray(columns) ? columns.join(', ') : columns
    const statement = await this.database.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE id = $id`, { $id: id })

    return statement.get()
  }

  async findAllWhere(column, operator = '=', value, columns = '*') {
    const cols = Array.isArray(columns) ? columns.join(', ') : columns
    const statement = await this.database.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE ${column} ${operator} $value`, { $value: value })

    return statement.get()
  }

  async findOneWhere(column, operator = '=', value, columns = '*') {
    const cols = Array.isArray(columns) ? columns.join(', ') : columns
    const statement = await this.database.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE ${column} ${operator} $value`, { $value: value })

    return statement.get()
  }

  async create(data) {
    const parsedData = parse(this.validators.create, data)
    const columns = Object.keys(parsedData)
    const values = Object.values(parsedData)
    const statement = await this.database.prepare(`INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`, values)

    return statement.run()
  }

  async update(id, data) {
    const parsedData = parse(this.validators.update, data)
    const columns = Object.keys(parsedData)
    const values = Object.values(parsedData)
    const statement = await this.database.prepare(`UPDATE ${this.tableName} SET ${columns.map((column) => `${column} = ?`).join(', ')} WHERE id = $id`, [...values, id])

    return statement.run()
  }

  async delete(id) {
    const statement = await this.database.prepare(`DELETE FROM ${this.tableName} WHERE id = $id`, { $id: id })

    return statement.run()
  }
}
