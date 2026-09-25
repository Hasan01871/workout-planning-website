import Image from "next/image";
import banner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-[#111114] rounded-2xl mx-4 md:mx-8 mt-6 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-xl">
        <p className="text-[#ccff00] text-sm font-semibold tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight mb-4">
          Train with intent. Log every set.
        </h1>
        <p className="text-gray-400 mb-6">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-block bg-[#ccff00] text-black font-semibold px-6 py-3 rounded-lg hover:brightness-90 transition"
        >
          BROWSE WORKOUTS
        </a>
      </div>

      <div className="w-full md:w-1/3">
        <Image
          src={banner}
          alt="FitLog banner"
          className="w-full h-auto rounded-xl object-cover"
          priority
        />
      </div>
    </section>
  );
}