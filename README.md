# Active Record Example

This is naive implementation of the [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html) pattern in JavaScript with SQLite. Also, there is a handmade migration system to make this demo be more pleasant.

```
├── README.md
├── database
│   ├── migration.js
│   └── migrations
│       ├── 0-create-books-table.js
│       └── 1-seed-books-table.js
├── package-lock.json
├── package.json
└── src
    ├── config
    │   └── db.js
    ├── index.js
    └── models
        └── active-record.js
        └── book.js
```

## How to run

```bash
npm i
npm run db:migrate up all
npm run start
```

## Reset database

```bash
npm run db:migrate down all
```
