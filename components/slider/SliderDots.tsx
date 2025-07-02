interface SliderDotsProps {
  total: number;
  selected: number;
  onSelect?: (index: number) => void;
  className?: string;
  disabled?: boolean;
}

export default function SliderDots({
  total,
  selected,
  onSelect,
  className = "",
  disabled = false,
}: SliderDotsProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect && onSelect(i)}
          disabled={disabled}
          aria-label={`Go to slide ${i + 1}`}
          className={`transition-all duration-300 flex items-center justify-center focus:outline-none ${
            i === selected
              ? "w-5 h-2 bg-black rounded-full" // pill/elongated
              : "w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-500"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        />
      ))}
    </div>
  );
}
