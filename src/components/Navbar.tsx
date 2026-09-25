"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-[#ccff00] font-semibold"
      : "text-gray-300 hover:text-white transition-colors";

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-[#ccff00]">⚡</span> FITLOG
        </Link>

        {/* Middle links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        {/* Right side badges */}
        <Link href="/my-plan" className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-gray-300">
            Plan
            <span className="bg-[#ccff00] text-black font-bold px-2 py-0.5 rounded-full text-xs">
              {plan.length}
            </span>
          </span>
          <span className="flex items-center gap-2 text-gray-300">
            Saved
            <span className="border border-gray-400 text-gray-200 px-2 py-0.5 rounded-full text-xs">
              {saved.length}
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
}