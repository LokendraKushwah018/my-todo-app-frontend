"use client";
import api from "@/lib/axios";
import type { Todo } from "@/types/todo";
import { useState } from "react";

export default function TodoList({
  todos,
  onChange,
}: {
  todos: Todo[];
  onChange: () => void;
}) {
  const [busyId, setBusyId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // ✅ Toggle completed status
  const toggle = async (t: Todo) => {
    setBusyId(t.id);
    try {
      // PUT /todos/{id} with completed toggle
      await api.put(`/todos/${t.id}`, { completed: !t.completed });
      onChange(); // refetch after update
    } catch (e) {
      console.error("Toggle error", e);
    } finally {
      setBusyId(null);
    }
  };

  // ✅ Edit existing task
  const startEdit = (t: Todo) => {
    setEditId(t.id);
    setEditText(t.todo);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const saveEdit = async (id: number) => {
    if (!editText.trim()) return;
    setBusyId(id);
    try {
      await api.put(`/todos/${id}`, { todo: editText.trim() });
      onChange();
      cancelEdit();
    } catch (e) {
      console.error("Edit error", e);
    } finally {
      setBusyId(null);
    }
  };

  // ✅ Delete task
  const remove = async (id: number) => {
    setBusyId(id);
    try {
      await api.delete(`/todos/${id}`);
      onChange();
    } catch (e) {
      console.error("Delete error", e);
    } finally {
      setBusyId(null);
    }
  };

  if (!todos?.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
        No tasks yet. Create your first one!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((t) => {
        const isBusy = busyId === t.id;
        const isEditing = editId === t.id;

        return (
          <li
            key={t.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-1 items-start gap-3">
              {/* ✅ Checkbox toggle */}
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={t.completed}
                disabled={isBusy || isEditing}
                onChange={() => toggle(t)}
              />

              {/* ✅ Editable text or plain view */}
              {!isEditing ? (
                <span
                  className={`flex-1 break-words ${
                    t.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 font-medium"
                  }`}
                >
                  {t.todo}
                </span>
              ) : (
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit task"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(t.id)}
                      disabled={isBusy || !editText.trim()}
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Actions */}
            {!isEditing && (
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(t)}
                  disabled={isBusy}
                  className="rounded-md border border-indigo-200 px-3 py-1.5 text-sm text-indigo-700 transition hover:bg-indigo-50 disabled:opacity-60"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(t.id)}
                  disabled={isBusy}
                  className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
