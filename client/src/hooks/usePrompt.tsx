import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function usePrompt(message: string, when: boolean = true) {
  // Block internal navigation using useBlocker
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm(message);
      if (proceed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  // Add a beforeunload listener for page reloads or closing the tab/window
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (when) {
        e.preventDefault();
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when, message]);
}
