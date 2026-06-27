import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

const API = "http://localhost:5000/api/tasks";

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    async function fetchTasks() {
        try {
            const res = await axios.get(API);
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function createTask(task) {
        const res = await axios.post(API, task);
        setTasks((prev) => [res.data, ...prev]);
    }

    async function updateTask(id, body) {
        const res = await axios.patch(`${API}/${id}`, body);

        setTasks((prev) =>
            prev.map((t) => (t._id === id ? res.data : t)),
        );
    }

    async function deleteTask(id) {
        await axios.delete(`${API}/${id}`);

        setTasks((prev) =>
            prev.filter((t) => t._id !== id),
        );
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => useContext(TaskContext);