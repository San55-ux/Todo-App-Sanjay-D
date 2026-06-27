import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import taskRouter from "./routes/taskRoutes.js";
import { connectDB } from "./lib/db.js";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRouter);

await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
