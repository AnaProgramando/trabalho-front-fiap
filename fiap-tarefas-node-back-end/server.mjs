import express from "express";
import { createTable } from "./routes/services/createTable.mjs";
import { login } from "./routes/persistence/login.mjs";
import { createTasks, getTaskById, loadTasks, updateTask, deleteTask, pathTask} from "./routes/persistence/tasks.mjs";
import {  NOT_FOUND, CREATE_TASK_SUCCESS, RUN_NODE_WITH_EXPRESS, RUN_APP_HTTPS, LOGIN_FAIL, 
  LOGIN_SUCCESS, BAD_REQUEST} from "./utils/const.mjs";
import cors from "cors";
import fs from "fs";
import https from "https";

const app = express();
app.use(express.json());
app.use(cors()); //Evita o erro de Cors no navegador

createTable();

app.post("/login", async function (req, resp) {
  const loginAttempt = await login(req.body);

  if (loginAttempt) {
    resp.json(LOGIN_SUCCESS);
  } else {
    resp.status(401).json(LOGIN_FAIL);
  }

  resp.end();
});

app.post("/tasks", async function (req, resp) {
  const task = await createTasks({
    description: req.body.description,
    due_date: req.body.due_date,
  });

  resp
    .status(201)
    .json({ message: CREATE_TASK_SUCCESS, taskId: task.lastID })
    .end();
});

app.get("/tasks", async function (req, resp) {
  const tasks = await loadTasks();
  resp.json(tasks);
});

app.get("/tasks/:id", async function (req, resp) {
  let id = req.params.id;
  const task = await getTaskById(id);
  if (task === undefined) {
    resp.json({
      statusCode: 400,
      message: NOT_FOUND,
    });
    resp.status(400).end();
  }
  resp.status(200);
  resp.json(task);
});

app.put("/tasks", function (req, resp) {
  if (req.body && !req.body.idTask) {
    resp.json({
      statusCode: 400,
      message: NOT_FOUND,
    });
  } else {
    updateTask(req.body);
    resp.json("Tarefa nº " + req.body.idTask + " alterada com sucesso!");
    resp.status(200).end();
  }
});

app.patch("/tasks/:id", async function (req, resp) {
  if (req.body && req.body.date_of_conclusion === undefined) {
    resp.status(400).json(BAD_REQUEST).end();
  }

  let id = req.params.id;
  const task = await getTaskById(id);
  if (task === undefined) {
    resp.status(404).json(NOT_FOUND).end();
  } else {
    pathTask({
      id: req.params.id,
      date_of_conclusion: req.body.date_of_conclusion,
    });
    resp.json(`Tarefa nº ${id} atualizada com sucesso!`).end();
  }
});

app.delete("/tasks/:id", async function (req, resp) {
  let id = req.params.id;
  const task = await getTaskById(id);
  if (task === undefined) {
    resp.json({
      statusCode: 400,
      message: NOT_FOUND,
    });
  } else {
    deleteTask(id);
    resp.status(200);
    resp.json("Tarefa nº " + id + " excluída com sucesso!");
  }
});

app.listen(8888, () => {
  console.log(RUN_NODE_WITH_EXPRESS);
});

https
  .createServer(
    {
      cert: fs.readFileSync("routes/HTTPS/cert.pem"),
      key: fs.readFileSync("routes/HTTPS/key.pem"),
   
    },
    app
  )
  .listen(8889, () => console.log(RUN_APP_HTTPS));

