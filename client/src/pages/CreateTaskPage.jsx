import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import { useTasks } from "../context/TaskContext";

export default function CreateTaskPage() {
    const { createTask } = useTasks();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        desc: "",
        priority: "medium",
        due: "",
        cat: "General",
    });
    const [error, setError] = useState("");

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    async function submit() {
        if (!form.title.trim()) {
            setError("Task title is required.");
            return;
        }
        setError("");
        await createTask({
            title: form.title,
            desc: form.desc,
            priority: form.priority,
            due: form.due,
            cat: form.cat,
            done: false,
        });
        navigate("/");
    }

    return (
        <div className="max-w-xl max-h-fit mx-auto px-4 py-8 bg-white border border-gray-200 mt-5 rounded-2xl">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-base text-black hover:text-gray-700 mb-5"
            >
                <ChevronLeft size={15} /> Back to tasks
            </Link>
            <h1 className="text-xl font-medium text-black mb-1">
                Create a task
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                Fill in the details below to add new task.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-2xl">
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-1.5">
                        Task title <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submit()}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 shadow"
                        placeholder="What needs to be done?"
                    />
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-1.5">
                        Description
                    </label>
                    <textarea
                        value={form.desc}
                        onChange={(e) => set("desc", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 resize-none shadow"
                        rows={3}
                        placeholder="Add any extra context or notes..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1.5">
                            Priority
                        </label>
                        <select
                            value={form.priority}
                            onChange={(e) => set("priority", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 shadow"
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1.5">
                            Due date
                        </label>
                        <input
                            type="date"
                            value={form.due}
                            onChange={(e) => set("due", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 shadow"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-1.5">
                        Category
                    </label>
                    <select
                        value={form.cat}
                        onChange={(e) => set("cat", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 shadow"
                    >
                        {[
                            "General",
                            "Work",
                            "Study",
                            "Personal",
                            "Project",
                        ].map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className="text-base font-semibold text-red-500">
                        {error}
                    </p>
                )}

                <div className="flex gap-2.5 pt-1">
                    <button
                        onClick={submit}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white text-base font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        <Plus size={15} /> Create task
                    </button>
                    <button
                        onClick={() =>
                            setForm({
                                title: "",
                                desc: "",
                                priority: "medium",
                                due: "",
                                cat: "General",
                            })
                        }
                        className="px-4 py-2 text-base text-red-700 bg-red-50 border border-gray-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
