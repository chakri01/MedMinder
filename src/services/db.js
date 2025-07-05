import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'medminder.db', location: 'default' });

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS medications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dose TEXT,
        schedule TEXT,
        timezone TEXT,
        last_taken DATETIME,
        missed_count INTEGER DEFAULT 0
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS caregivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        contact TEXT
      );`
    );
  });
};

export default db;