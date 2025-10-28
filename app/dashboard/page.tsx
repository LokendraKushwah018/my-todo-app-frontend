"use client";
import Protected from "@/components/Protected";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { currentUser, logout } from "@/lib/auth";
import useIdleLogout from "@/hooks/useIdleLogout";
import IdleLogoutModal from "@/components/IdleLogoutModal";
import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function DashboardPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const user = currentUser();
  const userId = user?.id;

  const { showWarning, secondsLeft, stayLoggedIn, forceLogout } = useIdleLogout();

  const fetchTodos = async () => {
    if (!userId) return;
    // GET /todos/user/{id}
    const { data } = await api.get(`/todos/user/${userId}`);
    setTodos(data?.todos || []);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLogoutClick = () => {
    // Show the logout modal when the user clicks logout
    forceLogout();
  };

  return (
    <Protected>
      {/* Show the idle logout modal if it's time for the user to log out */}
      <IdleLogoutModal
        open={showWarning}
        secondsLeft={secondsLeft}
        onStay={stayLoggedIn}
        onLogout={handleLogoutClick} // Trigger forceLogout on logout
      />

      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-gray-600 sm:inline">
            Welcome, {user?.firstName || user?.username}
          </span>
          <button
            onClick={handleLogoutClick} // Trigger the modal on click
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* “Events” list requirement → we show your tasks (events) */}
      <section className="mb-6 rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-medium">Your Tasks (Events)</h2>
        <TodoList todos={todos} onChange={fetchTodos} />
      </section>

      <section className="rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-medium">Create New Task</h2>
        <TodoForm onCreated={fetchTodos} />
      </section>
    </Protected>
  );
}
