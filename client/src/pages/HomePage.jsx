import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Eye, Trash2, CheckCircle2, Circle } from "lucide-react";
import { useTasks } from "../context/TaskContext";

const PRIORITY_STYLES = {
    high: "border-l-4 border-l-red-500  text-red-800",
    medium: "border-l-4 border-l-amber-500 text-amber-800",
    low: "border-l-4 border-l-green-500 text-green-800",
};

const PRIORITY_STYLE = {
    high: "text-red-800",
    medium: "text-amber-800",
    low: "text-green-800",
}

const FILTERS = ["all", "active", "completed", "high", "medium", "low"];

export default function HomePage() {
    const { tasks, updateTask, deleteTask } = useTasks();
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const filtered = tasks.filter((t) => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        if (["high", "medium", "low"].includes(filter))
            return t.priority === filter;
        return true;
    });

    const done = tasks.filter((t) => t.done).length;
    const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

    async function toggle(id, done) {
        await updateTask(id, {
            done: !done,
        });
    }

    async function remove(id) {
        await deleteTask(id);
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 bg-white mt-20 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-medium text-black">
                        My tasks
                    </h1>
                    <p className="text-gray-400 mt-0.5">
                        {tasks.filter((t) => !t.done).length} remaining · {done}{" "}
                        completed
                    </p>
                </div>
                <Link
                    to="/createtask"
                    className="flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                    <Plus size={15} /> Add task
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-medium text-black">
                        {tasks.length}
                    </div>
                    <div className="text-xl font-semibold mt-0.5">Total</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-medium text-blue-600">
                        {tasks.filter((t) => !t.done).length}
                    </div>
                    <div className="text-xl font-semibold mt-0.5">Active</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-medium text-green-600">
                        {done}
                    </div>
                    <div className="text-xl font-semibold mt-0.5">Done</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-medium text-red-700">
                        {
                            tasks.filter(
                                (t) => t.priority === "high" && !t.done,
                            ).length
                        }
                    </div>
                    <div className="text-xl font-semibold mt-0.5">
                        High priority
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-gray-400">Overall progress</span>
                    <span className="font-medium text-green-600">{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                        className="h-1.5 bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-4">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-full border transition-colors capitalize ${
                            filter === f
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Task list */}
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
                {filtered.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                        No tasks here.{" "}
                        <Link
                            to="/createtask"
                            className="text-blue-600 hover:underline"
                        >
                            Add one
                        </Link>
                        .
                    </div>
                ) : (
                    filtered.map((task) => (
                        <div
                            key={task._id}
                            className={`flex items-start gap-3 px-4 py-3.5 group ${PRIORITY_STYLES[task.priority]} mb-1`}
                        >
                            <button
                                onClick={() => toggle(task._id, task.done)}
                                className="mt-0.5 flex-shrink-0 text-gray-300 hover:text-green-500 transition-colors"
                            >
                                {task.done ? (
                                    <CheckCircle2
                                        size={20}
                                        className="text-green-500"
                                    />
                                ) : (
                                    <Circle size={20} />
                                )}
                            </button>
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`cursor-pointer ${
                                        task.done
                                            ? "line-through text-gray-400 font-semibold"
                                            : "text-black font-semibold"
                                    }`}
                                    onClick={() =>
                                        navigate(`/viewtask/${task._id}`)
                                    }
                                >
                                    {task.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span
                                        className={`text-base font-medium px-2 py-0.5 rounded-full capitalize ${PRIORITY_STYLE[task.priority]}`}
                                    >
                                        {task.priority}
                                    </span>
                                    <span className="text-base bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                        {task.cat}
                                    </span>
                                    {task.due && (
                                        <span className="text-sm text-gray-400">
                                            {task.due}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() =>
                                        navigate(`/viewtask/${task.id}`)
                                    }
                                    className="p-1.5 rounded-md text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    <Eye size={20} />
                                </button>
                                <button
                                    onClick={() => remove(task._id)}
                                    className="p-1.5 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
