# Todo App (MERN)

A full-stack Todo application built with **React (Vite)**, **Express**, and **MongoDB (Mongoose)**.

## Features

- Create tasks (title required)
- View a task’s details
- Mark tasks as **done/active**
- Delete tasks
- Filter tasks by:
  - `all`, `active`, `completed`
  - priority: `high`, `medium`, `low`
- Task metadata:
  - `priority`, `category`, `due`, `description`
- Sort tasks by most recently created

## Tech Stack

- **Client:** React + Vite, React Router, TailwindCSS, Axios, lucide-react
- **Server:** Express, Mongoose, CORS, dotenv
- **Database:** MongoDB

## Project Structure

- `client/` - React frontend
- `server/` - Express + MongoDB backend

## Getting Started

### 1) Server (backend)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Configure environment variables:
   - Create a `.env` file inside `server/`.
   - Expected variable:
     - `MONGODB_URI` = your MongoDB connection string
3. Run the server:
   ```bash
   npm start
   ```

> Note: The server listens on port **5000**.

### 2) Client (frontend)

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Run the client:
   ```bash
   npm run dev
   ```

## API Reference

Base URL:
- `http://localhost:5000/api/tasks`

### Endpoints

- **GET** `/api/tasks`
  - Returns all tasks sorted by `createdAt` descending.

- **POST** `/api/tasks`
  - Creates a task.

- **PATCH** `/api/tasks/:id`
  - Updates a task by id.

- **DELETE** `/api/tasks/:id`
  - Deletes a task by id.

## Task Model (MongoDB)

The backend uses a `Task` schema with:

- `title` (string, **required**)
- `desc` (string, default `""`)
- `priority` (string, enum: `high | medium | low`, default `medium`)
- `due` (string, default `""`)
- `cat` (string, default `"General"`)
- `done` (boolean, default `false`)
- `timestamps: true` (adds `createdAt`, `updatedAt`)

## Client Routes

- `/` - Home (task list + filters)
- `/createtask` - Create a new task
- `/viewtask/:id` - View/modify one task

## Troubleshooting

- If the client can’t reach the server, ensure the backend is running on **http://localhost:5000**.
- Ensure `server/.env` contains a valid `MONGODB_URI`.

## License

MIT (or your preferred license).

