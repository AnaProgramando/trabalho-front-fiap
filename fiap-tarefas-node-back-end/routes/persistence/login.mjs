import { openDb } from "../services/db.mjs";
import bcrypt from "bcrypt";

export async function login(user) {
  const db = await openDb();
  const sql = "SELECT * from users where email=?";
  const userDb = await db.get(sql, [user.email]).then((resp) => resp);

  if (userDb) {
    return await bcrypt
      .compare(user.password, userDb.password)
      .then((res) => res)
      .catch((err) => {
        console.error("err", err.message);
        return false;
      });
  }
  return false;
}
