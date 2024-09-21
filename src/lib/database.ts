// src/lib/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = open({
  filename: './database.db',
  driver: sqlite3.Database,
});

// Initialize the database and create a table if it doesn't exist
export async function initializeDb() {
  const database = await db;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imageId TEXT,
      description TEXT,
      name TEXT,
      contact TEXT,
      content TEXT
    )
  `);
}
