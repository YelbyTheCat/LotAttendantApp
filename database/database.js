import * as SQLite from 'expo-sqlite';

const openDatabaseAsync = async () => {
  const db = await SQLite.openDatabaseAsync('vehiclecheckin.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
  `);
  console.log('Database initialized with WAL journal mode');
  return db;
};

export { openDatabaseAsync };
