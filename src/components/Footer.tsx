import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 px-4 md:px-8 py-6 flex items-center justify-between text-sm text-gray-400">
      <div className="flex items-center gap-2 font-semibold text-white">
        <Image src={logo} alt="FitLog logo" className="w-6 h-6 -rotate-45" />
        FITLOG
      </div>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}