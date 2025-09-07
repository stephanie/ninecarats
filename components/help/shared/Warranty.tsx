"use client";

import { ButtonDark } from "components/ui/ButtonDark";

interface WarrantyProps {
  className?: string;
}

export function Warranty({ className = "" }: WarrantyProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl text-gray-900 font-header">
        The Nine Carats Warranty
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm">
          Your Nine Carats jewelry is protected by our comprehensive warranty
          program, ensuring your investment remains beautiful and secure for
          years to come.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              Lifetime Free Repairs
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Free repairs for manufacturing defects
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Stone tightening and re-setting services
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Ring resizing within the first year
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Professional cleaning and polishing
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              What's Covered
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Loose or lost stones due to manufacturing issues
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Prong straightening and repair
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Chain and clasp repairs
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Ring band repairs and maintenance
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              Warranty Terms
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Valid for the original purchaser only
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Annual inspection recommended to maintain coverage
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Normal wear and tear not covered
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Damage from accidents or misuse not covered
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <p className="text-gray-700 text-sm">
            To initiate a warranty claim, simply contact our customer service
            team with your purchase details. We'll guide you through the process
            and arrange for your jewelry to be repaired at no cost.
          </p>
        </div>

        <div className="pt-2">
          <ButtonDark className="text-sm">Contact Customer Service</ButtonDark>
        </div>
      </div>
    </div>
  );
}
