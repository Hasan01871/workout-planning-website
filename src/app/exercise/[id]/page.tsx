"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

export default function ExerciseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    getWorkoutById(id)
      .then(setWorkout)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center text-gray-400 py-20">Loading...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div>
        <Navbar />
        <p className="text-center text-gray-400 py-20">Workout not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full rounded-xl object-cover"
        />

        {/* Right: details */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase mb-2">
            {workout.name}
          </h1>
          <p className="text-gray-400 mb-4">{workout.description}</p>

          <div className="flex gap-2 mb-6">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/40 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#111114] rounded-xl divide-y divide-white/5 mb-6">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", workout.sets],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex justify-between px-4 py-3 text-sm"
              >
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>

          <h3 className="font-bold uppercase mb-3">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
            {workout.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <div className="flex gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] text-black font-semibold px-5 py-3 rounded-lg hover:brightness-90"
            >
              ➕ Add to today plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5"
            >
              🔖 Save for later
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}