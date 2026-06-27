import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Trash2 } from "lucide-react";
import { useTasks } from "../context/TaskContext";

const PRIORITY_STYLES = {
    high: "bg-red-50 text-red-800",
    medium: "bg-amber-50 text-amber-800",
    low: "bg-green-50 text-green-800",
};

export default function ViewTaskPage() {
    const { tasks, updateTask, deleteTask } = useTasks();
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find((t) => t._id === id);
    

    if (!task)
        return (
            <div className="max-w-xl mx-auto px-4 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-700 mb-5"
                >
                    <ChevronLeft size={15} /> Back to tasks
                </Link>
                <p className="text-gray-400">Task not found.</p>
            </div>
        );

    async function toggle() {
        await updateTask(task._id, {
            done: !task.done,
        });
    }

    async function remove() {
        await deleteTask(task._id);

        navigate("/");
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-base text-black hover:text-gray-700 mb-5"
            >
                <ChevronLeft size={15} /> Back to tasks
            </Link>

            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                    <h1
                        className={`text-2xl font-medium leading-snug ${task.done ? "line-through text-gray-400" : "text-black"}`}
                    >
                        {task.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span
                            className={`text-base font-medium px-2.5 py-0.5 rounded-full capitalize ${PRIORITY_STYLES[task.priority]}`}
                        >
                            {task.priority}
                        </span>
                        <span className="text-base bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
                            {task.cat}
                        </span>
                        <span
                            className={`text-base px-2.5 py-0.5 rounded-full ${task.done ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}
                        >
                            {task.done ? "Completed" : "Active"}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggle}
                        className={`flex items-center gap-1.5 text-base font-medium px-4 py-2 rounded-lg transition-colors ${
                            task.done
                                ? "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                : "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                        }`}
                    >
                        <CheckCircle2 size={14} />
                        {task.done ? "Mark active" : "Mark done"}
                    </button>
                    <button
                        onClick={remove}
                        className="flex items-center gap-1.5 text-base font-medium px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            </div>

            <div className="grid gap-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl">
                    <p className="text-sm text-gray-400 mb-1.5">Description</p>
                    <p
                        className={`text-base ${task.desc ? "text-black font-medium" : "text-gray-400"}`}
                    >
                        {task.desc || "No description provided."}
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-y-3 shadow-xl">
                    {[
                        { label: "Due date", val: task.due || "—" },
                        { label: "Created", val: task.created },
                        { label: "Priority", val: task.priority },
                        { label: "Category", val: task.cat },
                    ].map(({ label, val }) => (
                        <div key={label}>
                            <p className="text-sm text-gray-400 mb-0.5">
                                {label}
                            </p>
                            <p className="text-base text-black font-medium capitalize">
                                {val}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
