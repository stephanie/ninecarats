import clsx from "clsx";

interface SliderProgressBarProps {
  /** Normalized scroll position 0–1 (e.g. Embla `scrollProgress()`). */
  progress: number;
  className?: string;
  /** Thumb width as a percent of the track (default ~Tiffany-style pill). */
  thumbWidthPercent?: number;
  /** Grey track thickness (Tailwind height class suffix, e.g. `1.5` → `h-1.5`). */
  trackHeightClass?: "1" | "1.5" | "2" | "2.5" | "3";
  /** Black thumb thickness; usually ≥ track for visibility. */
  thumbHeightClass?: "1" | "1.5" | "2" | "2.5" | "3";
}

export default function SliderProgressBar({
  progress,
  className,
  thumbWidthPercent = 18,
  trackHeightClass = "1.5",
  thumbHeightClass = "2",
}: SliderProgressBarProps) {
  const maxLeft = 100 - thumbWidthPercent;
  const left = Math.min(maxLeft, Math.max(0, progress * maxLeft));

  return (
    <div
      className={clsx(
        "relative mx-auto w-full max-w-xs rounded-full bg-neutral-200",
        trackHeightClass === "1" && "h-1",
        trackHeightClass === "1.5" && "h-1.5",
        trackHeightClass === "2" && "h-2",
        trackHeightClass === "2.5" && "h-2.5",
        trackHeightClass === "3" && "h-3",
        className,
      )}
      role="presentation"
      aria-hidden
    >
      <div
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 rounded-full bg-primary ease-out will-change-[left]",
          thumbHeightClass === "1" && "h-1",
          thumbHeightClass === "1.5" && "h-1.5",
          thumbHeightClass === "2" && "h-2",
          thumbHeightClass === "2.5" && "h-2.5",
          thumbHeightClass === "3" && "h-3",
        )}
        style={{
          width: `${thumbWidthPercent}%`,
          left: `${left}%`,
          transition: "left 80ms linear",
        }}
      />
    </div>
  );
}
