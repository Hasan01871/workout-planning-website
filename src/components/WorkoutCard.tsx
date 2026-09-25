import Link from "next/link";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="bg-[#111114] rounded-xl overflow-hidden border border-white/5 hover:border-[#ccff00]/50 transition block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={workout.image}
        alt={workout.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <div className="flex gap-2 mb-2 flex-wrap">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/40 px-2 py-0.5 rounded-full"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <h3 className="font-bold uppercase">{workout.name}</h3>
        <p className="text-gray-400 text-sm mb-2">{workout.equipment}</p>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span>🕐 {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}