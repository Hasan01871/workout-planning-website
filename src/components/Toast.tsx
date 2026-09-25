"use client";

import { usePlan } from "@/context/PlanContext";

export default function Toast() {
  const { toasts } = usePlan();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-[#ccff00] text-black text-sm font-semibold px-4 py-2 rounded-lg shadow-lg animate-pulse"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}