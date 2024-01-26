import sqlite3 from 'sqlite3';
import { setupDatabase } from './dbSetup';

// Create a function that initializes the database. 
export function initDb() {
  const db = new sqlite3.Database('mydb.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      setupDatabase(db);
    }
  });

  return db;
}
