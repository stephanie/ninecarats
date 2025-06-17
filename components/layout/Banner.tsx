"use client";

export default function Banner() {
  return (
    <div className="w-full bg-[#000000] text-white flex items-center justify-center px-6 py-3 relative z-50">
      <span className="mx-auto text-sm xs:text-base text-center">
        Explore our sparkling new Nine Carats collections.{" "}
        <a href="#" className="underline cursor-pointer">
          Sign up for 10% off.
        </a>
      </span>
    </div>
  );
}
