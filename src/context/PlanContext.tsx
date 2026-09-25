"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Workout, PlanItem } from "@/types/workout";

interface Toast {
  id: number;
  message: string;
}

interface PlanContextType {
  plan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  markAsDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toasts: Toast[];
  showToast: (message: string) => void;
}

const PLAN_CAP = 5;
const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  // localStorage থেকে সরাসরি প্রথম render-এই data লোড হয় (lazy initializer)
  // তাই আলাদা useEffect লাগে না, আর ESLint-এর set-state-in-effect warning-ও আসে না
  const [plan, setPlan] = useState<PlanItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      return savedPlan ? JSON.parse(savedPlan) : [];
    } catch {
      return [];
    }
  });

  const [saved, setSaved] = useState<PlanItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedSaved = localStorage.getItem("fitlog_saved");
      return savedSaved ? JSON.parse(savedSaved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // plan পরিবর্তন হলেই localStorage-এ সেভ হবে
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  // saved পরিবর্তন হলেই localStorage-এ সেভ হবে
  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  function showToast(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }

  function addToPlan(workout: Workout) {
    if (plan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      showToast("Today's plan is full (max 5)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    showToast("Added to today's plan");
  }

  function addToSaved(workout: Workout) {
    if (saved.some((w) => w.id === workout.id)) {
      showToast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, { ...workout }]);
    showToast("Saved for later");
  }

  function markAsDone(id: number) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: true } : w))
    );
    showToast("Marked as done");
  }

  function removeFromPlan(id: number) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from plan");
  }

  function removeFromSaved(id: number) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from saved");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
        toasts,
        showToast,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}