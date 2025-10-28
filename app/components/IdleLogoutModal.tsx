"use client";
import { useEffect } from "react";

export default function IdleLogoutModal({
  open,
  secondsLeft,
  onStay,
  onLogout,
}: {
  open: boolean;
  secondsLeft: number;
  onStay: () => void;
  onLogout: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Don't show the modal if 'open' is false
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg transition transform duration-300 ease-in-out sm:w-96">
        <h2 className="text-lg font-semibold text-gray-900">Inactivity Warning</h2>
        <p className="mt-3 text-sm text-gray-600">
          You will be logged out in <span className="font-bold">{secondsLeft}</span> seconds due to inactivity.
        </p>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onStay}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-indigo-700"
          >
            Stay Logged In
          </button>
          <button
            onClick={onLogout}
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
