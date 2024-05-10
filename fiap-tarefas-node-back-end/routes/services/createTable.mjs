import { openDb } from "./db.mjs";
import bcrypt from "bcrypt";

export async function createTable() {
  let hasPassword = await bcrypt
    .hash("S3nh@.S3cr3t@", 10)
    .then((hash) => hash)
    .catch((err) => console.error(err.message));

  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY, description TEXT, due_date TEXT, date_of_conclusion TEXT); "
    );
    db.exec(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT);"
    );
    db.exec(
      `INSERT OR IGNORE INTO users(email, password) VALUES('email@verzel.com.br', '${hasPassword}');`
    );
  });
}
