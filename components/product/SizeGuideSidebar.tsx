"use client";

import { Sidebar } from "components/ui/Sidebar";
import { useState } from "react";

type SizeGuideProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedSize?: string;
  sizeType?: "ring" | "bracelet"; // new prop
};

export function SizeGuideSidebar({
  isOpen,
  onClose,
  selectedSize,
  sizeType = "bracelet",
}: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<"select" | "find">("select");

  const braceletSizes = [
    {
      braceletSize: "Small",
      wristDiameterIn: "5.26 - 5.75 in.",
      wristDiameterCm: "13.4 - 14.6 cm",
    },
    {
      braceletSize: "Medium",
      wristDiameterIn: "5.76 - 6.25 in.",
      wristDiameterCm: "14.6 - 15.9 cm",
    },
  ];

  // Placeholder data for ring sizes
  const ringSizes = [
    { ringSize: "5", diameterMm: "15.7", circumferenceMm: "49.3" },
    { ringSize: "6", diameterMm: "16.5", circumferenceMm: "51.8" },
    { ringSize: "7", diameterMm: "17.3", circumferenceMm: "54.4" },
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
            className={`flex-1 pb-3 text-left font-header ${activeTab === "select" ? "border-b-2 border-black" : "text-neutral-500"}`}
          >
            Select your size
          </button>
          <button
            onClick={() => setActiveTab("find")}
            className={`flex-1 pb-3 text-left font-header ${activeTab === "find" ? "border-b-2 border-black" : "text-neutral-500"}`}
          >
            Find your perfect fit
          </button>
        </div>

        {/* Content */}
        {activeTab === "select" && sizeType === "bracelet" && (
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
                {braceletSizes.map((size) => {
                  const isSelected = selectedSize === size.braceletSize;
                  return (
                    <tr
                      key={size.braceletSize}
                      className="border-b border-neutral-200"
                    >
                      <td className="py-3 text-sm">{size.braceletSize}</td>
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
        {activeTab === "select" && sizeType === "ring" && (
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    RING SIZE
                  </th>
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    DIAMETER (MM)
                  </th>
                  <th className="text-left py-3 text-xs font-normal text-neutral-500">
                    CIRCUMFERENCE (MM)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ringSizes.map((size) => (
                  <tr
                    key={size.ringSize}
                    className="border-b border-neutral-200"
                  >
                    <td className="py-3 text-sm">{size.ringSize}</td>
                    <td className="py-3 text-sm">{size.diameterMm}</td>
                    <td className="py-3 text-sm">{size.circumferenceMm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Tab: Find fit */}
        {activeTab === "find" && (
          <div>
            {sizeType === "bracelet" ? (
              <>
                <div className="w-full h-64 bg-neutral-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-neutral-400 text-sm">
                    Hand measurement illustration
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-6">
                  Size your cuffs and bangles to fit snugly, and your link and
                  chain bracelets to fit slightly loosely to allow for movement.
                </p>
                <ol className="space-y-4 text-sm text-neutral-600">
                  <li className="flex gap-3">
                    <span className="text-black">1.</span>
                    <span>
                      Use a flexible measuring tape or length of string.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black">2.</span>
                    <span>
                      Wrap it around the thickest part of the wrist (usually at
                      the wrist joint). If using string, mark the point on the
                      string where the ends meet with a pen. If you are creating
                      a bracelet stack, measure the point on your arm where
                      you'll wear each bracelet.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black">3.</span>
                    <span>
                      Lay the string on a flat surface and use a ruler to
                      measure the length (in inches or millimeters) up to the
                      mark. Compare your measurement to the Tiffany size chart;
                      to determine your bracelet size. If you are between sizes,
                      opt for the larger size.
                    </span>
                  </li>
                </ol>
              </>
            ) : (
              <>
                <div className="w-full h-64 bg-neutral-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-neutral-400 text-sm">
                    Ring measurement illustration
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-6">
                  Use a ring size chart, ruler, or printable ring sizer to
                  determine your size. Measure the inside diameter of your
                  favorite ring, or use a string to measure your finger
                  circumference and compare to the ring size table.
                </p>
                <ol className="space-y-4 text-sm text-neutral-600">
                  <li className="flex gap-3">
                    <span className="text-black">1.</span>
                    <span>
                      Wrap a string or strip of paper around the base of your
                      finger.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black">2.</span>
                    <span>
                      Mark where the string overlaps and measure the length in
                      millimeters.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black">3.</span>
                    <span>
                      Compare the length to a ring size conversion chart.
                    </span>
                  </li>
                </ol>
              </>
            )}
          </div>
        )}
      </div>
    </Sidebar>
  );
}
