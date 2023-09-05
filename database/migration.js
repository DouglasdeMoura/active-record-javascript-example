import path from 'node:path'
import fs from 'node:fs/promises'

const [option, index] = process.argv.slice(2)

async function main() {
  console.log('Running migrations...')

  const files = await fs.readdir(path.resolve('database/migrations'))

  if (!option) {
    console.error('Missing argument: up or down')

    process.exit(1)
  }

  if (!index) {
    console.error('Missing argument: all or number')

    process.exit(1)
  }

  const migrations = files.map((file) => import(`../database/migrations/${file}`))

  if (option === 'up') {
    if (index === 'all') {
      for (const migration of migrations) {
        const { up } = await migration
        await up()
      }
    } else if (migrations[index]) {
      const { up } = await migrations[index]
      await up()
    } else {
      console.error('Invalid migration number')

      process.exit(1)
    }
  } else if (option === 'down') {
    if (index === 'all') {
      const reversedMigrations = [...migrations].reverse()

      for (const migration of reversedMigrations) {
        const { down } = await migration
        await down()
      }
    } else if (migrations[index]) {
      const { down } = await migrations[index]
      await down()
    } else {
      console.error('Invalid migration number')

      process.exit(1)
    }
  }

  console.log('Done!')
  process.exit(0)
}

main()
