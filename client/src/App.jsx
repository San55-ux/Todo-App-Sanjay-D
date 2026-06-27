import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import ViewTaskPage from "./pages/ViewTaskPage";
import { ClipboardCheck, House, Pencil } from "lucide-react";

export default function App() {

    return (
        <div className="bg-gray-200 min-h-screen">
            <BrowserRouter>
                <nav className="flex items-center gap-4 px-6 py-3 border-b border-gray-100 bg-white">
                    <div className="flex flex-row gap-0.5 items-center">
                        <ClipboardCheck />
                        <h1>Todo App</h1>
                    </div>
                    <div className="flex flex-row cursor-pointer hover:rounded-2xl hover:bg-blue-700 hover:text-white p-2 gap-0.5 items-center">
                        <House />
                        <Link
                            to="/"
                            className="text-sm text-black-500 hover:text-white"
                        >
                            Home
                        </Link>
                    </div>
                    <div className="flex flex-row cursor-pointer hover:rounded-2xl hover:bg-blue-700 hover:text-white p-2 gap-0.5 items-center">
                        <Pencil />
                        <Link
                            to="/createtask"
                            className="text-sm text-black-500 hover:text-white"
                        >
                            Create task
                        </Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/createtask" element={<CreateTaskPage />} />
                    <Route path="/viewtask/:id" element={<ViewTaskPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
