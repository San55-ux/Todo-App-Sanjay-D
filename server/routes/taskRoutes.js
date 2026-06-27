import express from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", createTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
