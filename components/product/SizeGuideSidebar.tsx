"use client";

import { Sidebar } from "components/ui/Sidebar";
import { useState } from "react";

type SizeGuideProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedSize?: string;
};

export function SizeGuideSidebar({
  isOpen,
  onClose,
  selectedSize,
}: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<"select" | "find">("select");

  const sizes = [
    {
      tiffanySize: "Small",
      wristDiameterIn: "5.26 - 5.75 in.",
      wristDiameterCm: "13.4 - 14.6 cm",
    },
    {
      tiffanySize: "Medium",
      wristDiameterIn: "5.76 - 6.25 in.",
      wristDiameterCm: "14.6 - 15.9 cm",
    },
  ];

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Size Guide"
      width="w-[500px]"
      hideDefaultHeader
    >
      <div className="flex flex-col h-full relative">
        {/* Tabs */}
        <div className="flex border-b border-neutral-200 mt-8 mb-6 w-[90%]">
          <button
            onClick={() => setActiveTab("select")}
            className={`flex-1 pb-3 text-left font-header ${
              activeTab === "select"
                ? "border-b-2 border-black"
                : "text-neutral-500"
            }`}
          >
            Select your size
          </button>
          <button
            onClick={() => setActiveTab("find")}
            className={`flex-1 pb-3 text-left font-header ${
              activeTab === "find"
                ? "border-b-2 border-black"
                : "text-neutral-500"
            }`}
          >
            Find your perfect fit
          </button>
        </div>

        {/* Content */}
        {activeTab === "select" && (
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    SIZE
                  </th>
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    WRIST DIAMETER (IN)
                  </th>
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    WRIST DIAMETER (CM)
                  </th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => {
                  const isSelected = selectedSize === size.tiffanySize;
                  return (
                    <tr
                      key={size.tiffanySize}
                      className="border-b border-neutral-200"
                    >
                      <td className="py-3 text-sm">{size.tiffanySize}</td>
                      <td className="py-3 text-sm">{size.wristDiameterIn}</td>
                      <td className="py-3 text-sm">{size.wristDiameterCm}</td>
                      <td className="py-3">
                        <div className="flex justify-center">
                          {isSelected ? (
                            <svg
                              className="w-5 h-5 text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <div className="w-5 h-5 border-2 border-neutral-300 rounded-full"></div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "find" && (
          <div>
            {/* Illustration placeholder */}
            <div className="w-full h-64 bg-neutral-100 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-neutral-400 text-sm">
                Hand measurement illustration
              </div>
            </div>

            <p className="text-sm text-neutral-600 mb-6">
              Size your cuffs and bangles to fit snugly, and your link and chain
              bracelets to fit slightly loosely to allow for movement.
            </p>

            <ol className="space-y-4 text-sm text-neutral-600">
              <li className="flex gap-3">
                <span className="text-black">1.</span>
                <span>Use a flexible measuring tape or length of string.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black">2.</span>
                <span>
                  Wrap it around the thickest part of the wrist (usually at the
                  wrist joint). If using string, mark the point on the string
                  where the ends meet with a pen. If you are creating a bracelet
                  stack, measure the point on your arm where you'll wear each
                  bracelet.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-black">3.</span>
                <span>
                  Lay the string on a flat surface and use a ruler to measure
                  the length (in inches or millimeters) up to the mark. Compare
                  your measurement to the Tiffany size chart; to determine your
                  bracelet size. If you are between sizes, opt for the larger
                  size.
                </span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
