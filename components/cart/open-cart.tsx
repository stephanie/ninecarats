"use client";

export default function OpenCart({
  quantity,
  textColor,
  svgWidth = "24px",
  svgHeight = "24px",
}: {
  quantity?: number;
  textColor: string;
  svgWidth?: string;
  svgHeight?: string;
}) {
  return (
    <div className={`relative flex transition-colors ${textColor}`}>
      <svg
        width={svgWidth}
        height={svgHeight}
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="currentColor"
      >
        <path
          d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-full bg-primary-dark text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
