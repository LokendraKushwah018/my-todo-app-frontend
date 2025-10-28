import { useState, useEffect } from "react";

// Adjust the inactivity timeout (in seconds)
const TIMEOUT = 60; // 1 minute

export default function useIdleLogout() {
  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT);
  const [showWarning, setShowWarning] = useState(false);

  const resetTimer = () => {
    setSecondsLeft(TIMEOUT);
    setShowWarning(false);  // Hide the modal when reset
  };

  const startTimer = () => {
    setShowWarning(true); // Show the warning modal
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear interval when countdown reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return interval;
  };

  const stayLoggedIn = () => {
    resetTimer(); // Reset timer when user clicks "Stay Logged In"
  };

  const forceLogout = () => {
    resetTimer(); // Reset timer when user is logged out
    window.location.href = "/login"; // Redirect to login page after logout
  };

  useEffect(() => {
    // Start inactivity timer
    const interval = startTimer();

    return () => clearInterval(interval); // Cleanup timer on component unmount or page navigation
  }, []);

  return {
    showWarning,
    secondsLeft,
    stayLoggedIn,
    forceLogout,
  };
}
