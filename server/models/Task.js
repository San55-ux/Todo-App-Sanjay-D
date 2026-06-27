import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, default: "" },
        priority: {
            type: String,
            enum: ["high", "medium", "low"],
            default: "medium",
        },
        due: { type: String, default: "" },
        cat: { type: String, default: "General" },
        done: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
