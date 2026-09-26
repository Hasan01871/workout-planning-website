"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      <section id="library" className="px-4 md:px-8 mt-16">
        <h2 className="text-3xl font-extrabold uppercase mb-1">
          The Library
        </h2>
        <p className="text-gray-400 mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading workouts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}