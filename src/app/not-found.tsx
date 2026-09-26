import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#ccff00] mb-4">404</h1>
      <p className="text-gray-400 mb-6">
        This page doesn&apos;t exist. Maybe it skipped leg day.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-semibold px-5 py-3 rounded-lg"
      >
        Go back home
      </Link>
    </div>
  );
}