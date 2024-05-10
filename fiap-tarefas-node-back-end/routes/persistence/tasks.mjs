import { openDb } from "../services/db.mjs";

export async function createTasks(newTask) {
  let taskData = Object.values(newTask);
  const db = await openDb();
  const sql =
    "INSERT INTO Tasks (description, due_date) VALUES ($description, $due_date);";
  return db.run(sql, taskData);
}

export async function loadTasks() {
  const db = await openDb();
  const data = await db.all("SELECT * from Tasks;");
  return data;
}

export async function getTaskById(id) {
  const database = await openDb();
  const sql = "SELECT * from Tasks where id=?";
  return database.get(sql, [id]).then((resp) => resp);
}

export async function updateTask(task) {
  const database = await openDb();
  const sql =
    "UPDATE Tasks SET description=?, due_data=?, date_of_conclusion=? WHERE id=?";
  return database.run(sql, [
    task.description,
    task.due_data,
    task.date_of_conclusion,
    task.id,
  ]);
}

export async function pathTask(task) {
  const database = await openDb();
  const sql = "UPDATE Tasks SET date_of_conclusion=?  WHERE id=?";
  return database.run(sql, [task.date_of_conclusion, task.id]);
}

export async function deleteTask(id) {
  const database = await openDb();
  const sql = "DELETE from Tasks where id=?";
  return database.get(sql, [id]).then((resp) => resp);
}
