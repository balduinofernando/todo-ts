import "dotenv/config";
import express, { json } from "express";
import { TasksController } from "./controllers/TasksController";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(json());

// Routes
app.get("/", new TasksController().index);
app.get("/tasks", new TasksController().index);
app.get("/tasks/:id", new TasksController().show);
app.post("/tasks/", new TasksController().save);
app.put("/tasks/:id", new TasksController().update);
app.delete("/tasks/:id", new TasksController().delete);

// Listen the application
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
