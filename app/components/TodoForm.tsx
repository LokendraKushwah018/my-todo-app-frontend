"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function TodoForm({ onCreated }: { onCreated: () => void }) {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!todo.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      setLoading(true);
      // POST /todos/add (DummyJSON)
      await api.post("/todos/add", {
        todo: todo.trim(),
        completed: false,
        userId: 1, // DummyJSON requires a userId
      });
      setSuccess("✅ Task created successfully!");
      setTodo("");
      onCreated();
    } catch (err: any) {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

      {(error || success) && (
        <div
          className={`mt-2 w-full rounded-md px-4 py-2 text-sm ${
            error
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {error || success}
        </div>
      )}
    </form>
  );
}
