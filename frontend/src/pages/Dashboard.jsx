import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  // ---------- State ----------
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingAI, setLoadingAI] = useState(null);

  const [dark, setDark] = useState(
    localStorage.getItem("dark") === "true"
  );

  // ---------- Dark mode ----------
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark);
  }, [dark]);

  // ---------- Load tasks ----------
  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  // ---------- Initial load ----------
useEffect(() => { const fetchTasks = async () => { const res = await api.get("/tasks"); setTasks(res.data); }; fetchTasks(); }, []);
  // ---------- Create task ----------
  const createTask = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  // ---------- Enhance with AI ----------
  const enhanceTask = async (id) => {
    setLoadingAI(id);
    await api.post(`/ai/tasks/${id}/enhance`);
    setLoadingAI(null);
    loadTasks();
  };

  // ---------- JSX ----------
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
          MERN AI Task Manager
        </h1>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setDark(!dark)}
            className="text-sm px-3 py-1 rounded border dark:border-gray-600"
          >
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Create Task */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Create New Task
          </h2>

          <form onSubmit={createTask} className="space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:border-gray-600"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:border-gray-600"
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks */}
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-5"
            >
              <h3 className="font-semibold text-lg">
                {task.title}
              </h3>

              {task.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {task.description}
                </p>
              )}

              {/* AI Output */}
              {task.ai && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                  {task.ai.improvedDescription && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">AI Summary:</span>{" "}
                      {task.ai.improvedDescription}
                    </p>
                  )}

                  {task.ai.suggestedPriority && (
                    <p className="text-sm">
                      <span className="font-semibold">Priority:</span>{" "}
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {task.ai.suggestedPriority}
                      </span>
                    </p>
                  )}

                  {task.ai.suggestedDueDate && (
                    <p className="text-sm">
                      <span className="font-semibold">Due:</span>{" "}
                      {new Date(
                        task.ai.suggestedDueDate
                      ).toDateString()}
                    </p>
                  )}

                  {Array.isArray(task.ai.subtasks) &&
                    task.ai.subtasks.length > 0 && (
                      <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
                        {task.ai.subtasks.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    )}
                </div>
              )}

              <button
                onClick={() => enhanceTask(task._id)}
                disabled={loadingAI === task._id}
                className="mt-3 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded transition disabled:opacity-50"
              >
                {loadingAI === task._id
                  ? "Enhancing..."
                  : "✨ Enhance with AI"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
