"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { ToastContainer, toast } from "react-toastify";

import type { Item } from "@/app/Types/type";

type GymContextType = {
  data: Item[];
  loading: boolean;
  error: string;
  storageError: string;
  plan: Item[];
  saved: Item[];
  done: number[];
  storageLoaded: boolean;

  addToPlan: (item: Item) => boolean;
  addToSaved: (item: Item) => boolean;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;
};

const GymContext = createContext<GymContextType | undefined>(undefined);

const GymContextProvider = ({ children }: PropsWithChildren) => {
  // =========================
  // State
  // =========================

  const [data, setData] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [storageError, setStorageError] = useState("");

  const [plan, setPlan] = useState<Item[]>([]);

  const [saved, setSaved] = useState<Item[]>([]);

  const [done, setDone] = useState<number[]>([]);

  const [storageLoaded, setStorageLoaded] = useState(false);

  // =========================
  // Add workout to today's plan
  // =========================

  const addToPlan = (item: Item) => {
    // Check plan limit
    if (plan.length >= 5) {
      toast.error("Today's plan is full.");

      return false;
    }

    // Check duplicate workout
    if (plan.some((workout) => workout.id === item.id)) {
      toast.error("This workout is already in today's plan.");

      return false;
    }

    // Add workout
    setPlan((prev) => [...prev, item]);

    // Success message
    toast.success("Added to today's plan.");

    return true;
  };

  // =========================
  // Add workout to saved
  // =========================

  const addToSaved = (item: Item) => {
    // Check duplicate workout
    if (saved.some((workout) => workout.id === item.id)) {
      toast.error("This workout is already saved.");

      return false;
    }

    // Add workout
    setSaved((prev) => [...prev, item]);

    // Success message
    toast.success("Workout saved for later.");

    return true;
  };

  // =========================
  // Remove workout from plan
  // =========================

  const removeFromPlan = (id: number) => {
    // Remove workout
    setPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );

    // Remove done status
    setDone((prev) =>
      prev.filter((workoutId) => workoutId !== id)
    );

    // Error / remove message
    toast.error("Workout removed from today's plan.");
  };

  // =========================
  // Remove workout from saved
  // =========================

  const removeFromSaved = (id: number) => {
    // Remove workout
    setSaved((prev) =>
      prev.filter((workout) => workout.id !== id)
    );

    // Remove message
    toast.error("Workout removed from saved.");
  };

  // =========================
  // Mark workout as done
  // =========================

  const markAsDone = (id: number) => {
    setDone((prev) => {
      // If already done, don't add again
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });

    toast.success("Workout marked as done.");
  };

  // =========================
  // Get workout data from API
  // =========================

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        // Check API response
        if (!res.ok) {
          throw new Error("Failed to load workouts.");
        }

        // Convert response to JSON
        const data: Item[] = await res.json();

        // Store workout data
        setData(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load workouts."
        );
      } finally {
        setLoading(false);
      }
    };

    void getData();
  }, []);

  // =========================
  // Load data from localStorage
  // =========================

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog-plan");

      const savedWorkouts =
        localStorage.getItem("fitlog-saved");

      const doneWorkouts =
        localStorage.getItem("fitlog-done");

      // Load plan
      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }

      // Load saved workouts
      if (savedWorkouts) {
        setSaved(JSON.parse(savedWorkouts));
      }

      // Load completed workouts
      if (doneWorkouts) {
        setDone(JSON.parse(doneWorkouts));
      }
    } catch {
      setStorageError(
        "Could not load saved workouts from this browser."
      );
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  // =========================
  // Save data to localStorage
  // =========================

  useEffect(() => {
    // Don't save before localStorage data is loaded
    if (!storageLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(plan)
      );

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(saved)
      );

      localStorage.setItem(
        "fitlog-done",
        JSON.stringify(done)
      );
    } catch {
      setStorageError(
        "Could not save workouts in this browser."
      );
    }
  }, [plan, saved, done, storageLoaded]);

  // =========================
  // Provider
  // =========================

  return (
    <GymContext.Provider
      value={{
        data,
        loading,
        error,
        storageError,
        plan,
        saved,
        done,
        storageLoaded,

        addToPlan,
        addToSaved,

        removeFromPlan,
        removeFromSaved,

        markAsDone,
      }}
    >
      {children}

      {/* =========================
          Toast
      ========================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </GymContext.Provider>
  );
};

// =========================
// Custom Hook
// =========================

export const useGymContext = () => {
  const context = useContext(GymContext);

  if (!context) {
    throw new Error(
      "useGymContext must be used within GymContextProvider."
    );
  }

  return context;
};

export default GymContextProvider;