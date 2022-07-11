import { Request, Response } from "express";
import { database } from "../config/database";

export class TasksController {
  async index(request: Request, response: Response) {
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
  }

  async show(request: Request, response: Response) {
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
  }

  async save(request: Request, response: Response) {
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
  }

  async update(request: Request, response: Response) {
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
  }

  async delete(request: Request, response: Response) {
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
  }
}
