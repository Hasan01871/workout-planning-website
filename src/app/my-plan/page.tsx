"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { PlanItem } from "@/types/workout";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function MyPlanPage() {
    const { plan, saved, markAsDone, removeFromPlan, removeFromSaved } =
        usePlan();
    const [tab, setTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState<SortKey>("duration");

    const activeList: PlanItem[] = tab === "plan" ? plan : saved;

    const sortedList = [...activeList].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        return (a[sortBy] as number) - (b[sortBy] as number);
    });

    const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
                <h1 className="text-3xl font-extrabold uppercase mb-1">My Plan</h1>
                <p className="text-gray-400 mb-6">
                    Cap of five lifts for today. Finish them, then load more.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 bg-[#111114] rounded-xl p-6 mb-6">
                    <div>
                        <p className="text-gray-400 text-sm">Exercises</p>
                        <p className="text-2xl font-bold text-[#ccff00]">
                            {plan.length}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Minutes</p>
                        <p className="text-2xl font-bold">{totalMinutes}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Calories</p>
                        <p className="text-2xl font-bold">{totalCalories}</p>
                    </div>
                </div>

                {/* Tabs + sort */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2 bg-[#111114] rounded-lg p-1">
                        <button
                            onClick={() => setTab("plan")}
                            className={`px - 4 py-2 rounded-md text-sm ${
                tab === "plan" ? "bg-white/10 font-semibold" : "text-gray-400"
                            }`}
            >
                        Today Plan
                    </button>
                    <button
                        onClick={() => setTab("saved")}
                        className={`px - 4 py-2 rounded-md text-sm ${
                tab === "saved" ? "bg-white/10 font-semibold" : "text-gray-400"
                        }`}
            >
                    Saved
                </button>
            </div>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="bg-[#111114] border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
                <option value="duration">Sort By: Duration</option>
                <option value="caloriesBurned">Sort By: Calories</option>
                <option value="rating">Sort By: Rating</option>
            </select>
        </div>

        {/* List */ }
    {
        sortedList.length === 0 ? (
            <div className="text-center py-20 bg-[#111114] rounded-xl">
                <h3 className="font-bold uppercase mb-2">Nothing here yet</h3>
                <p className="text-gray-400 mb-4">
                    Browse the library and add a lift to get today moving.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-[#ccff00] text-black font-semibold px-5 py-2 rounded-lg"
                >
                    Go to workouts
                    </Link>
            </div>
        ) : (
        <div className="space-y-4">
            {sortedList.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#111114] rounded-xl p-4">
                    <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <h4 className="font-bold uppercase">{item.name}</h4>
                            <p className="text-gray-400 text-sm">{item.equipment}</p>
                            <p className="text-gray-300 text-xs">
                                🕐 {item.duration} min · 🔥 {item.caloriesBurned} kcal ·
                                ⭐ {item.rating}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/exercise/${item.id}`}
                        className="border border-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/5"
                  >
                        View Details
                    </Link>
                    {tab === "plan" && !item.done && (
                        <button
                            onClick={() => markAsDone(item.id)}
                            className="bg-[#ccff00] text-black px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                            ✓ Mark as Done
                        </button>
                    )}
                    <button
                        onClick={() =>
                            tab === "plan"
                                ? removeFromPlan(item.id)
                                : removeFromSaved(item.id)
                        }
                        className="text-gray-400 hover:text-red-400 px-2"
                    >
                        ✕
                    </button>
                </div>
              </div>
    ))
    }
          </div >
        )
}
      </div >
    <Footer />
    </div >
  );
}