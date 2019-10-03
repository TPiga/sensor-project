//postgres-db.ts
/*
This file initializes your PostgreSQL database. You need to supply
the host name, username, password and database name for your database.
*/
import { createConnection } from 'typeorm';
export const postgresDB = async () => {
  return await createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    database: 'my_database',
    ssl: false,
    logging: ['query', 'error'],
    synchronize: true,
  }).then(connection => {
    console.log('Database connection established');
  });
};
