import express, { json, Request, Response } from "express";
import { database } from "./config/database";
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(json());
// Routes
app.get("/", (request: Request, response: Response) => {
  return response.send("Ola Mundo");
});

app.get("/tasks", async (request: Request, response: Response) => {
  // Query the database

  await database.execute("select * from tasks", (err, rows: any) => {
    if (err) {
      return response
        .status(500)
        .json({ message: `Houve erro ao buscar a lista de tarefas ${err}` });
    }
    if (rows.length <= 0) {
      return response
        .status(404)
        .json({ message: "Nenhuma tarefa encontrada" });
    }

    return response.json(rows);
  });
});

app.get("/tasks/:id", async (request: Request, response: Response) => {
  // Query the database

  const { id } = request.params;

  await database.execute(
    `select * from tasks where id = ${id}`,
    (err, rows) => {
      if (err) {
        return response
          .status(500)
          .json({ message: `Houve erro ao buscar a tarefa ${err}` });
      }

      if (!rows) {
        return response
          .status(500)
          .json({ message: `Nenhuma tarefa foi encontrada` });
      }

      return response.json(rows);
    }
  );
});

app.post("/tasks/", async (request: Request, response: Response) => {
  // Get the name and status from the request body
  const { name, status } = request.body;

  // Insert the task into the database
  const sqlString =
    "INSERT INTO tasks (name, status, created_at, updated_at) VALUES (?,?,?,?)";
  let values = [name, status, new Date(), new Date()];
  if (!name || name === undefined) {
    return response
      .status(500)
      .json({ message: `Nenhuma tarefa deve estar com nome vazio` });
  }

  if (!status || status === undefined) {
    return response
      .status(500)
      .json({ message: `Nenhuma tarefa deve estar com status vazio` });
  }

  database.query(sqlString, values, (err, data, fields) => {
    if (err) {
      return response
        .status(500)
        .json({ message: `Houve erro ao inserir a tarefa ${err}` });
    }

    return response.json({
      status: 200,
      message: "A new task has been created",
    });
  });
});

app.put("/tasks/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, status } = request.body;

  const sqlString =
    "UPDATE tasks SET name = ?, status = ?, updated_at = ? WHERE id = ?";
  const values = [name, status, new Date(), id];

  database.query(sqlString, values, (err, data, fields) => {
    if (err) {
      return response
        .status(500)
        .json({ message: `Houve erro ao atualizar a tarefa ${err}` });
    }

    return response.json({
      status: 200,
      message: "A task has been updated",
    });
  });
});

app.delete("/tasks/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const sqlString = "DELETE FROM tasks WHERE id = ?";
  const values = [id];

  database.query(
    "SELECT * FROM tasks WHERE id = ?",
    values,
    (err, rows: any, fields) => {
      if (rows.length <= 0) {
        return response.status(404).json({
          status: 404,
          message: `A tarefa especificada é inexistente`,
        });
      }

      database.query(sqlString, values, (err, data, fields) => {
        if (err) {
          return response
            .status(500)
            .json({ message: `Houve erro ao deletar a tarefa ${err}` });
        }
        return response.json({
          status: 200,
          message: "A task has been deleted",
        });
      });
    }
  );
});

// Listen the application
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
