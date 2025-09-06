"use client";

interface QualityPromiseProps {
  className?: string;
}

export function QualityPromise({ className = "" }: QualityPromiseProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl text-gray-900 font-header">
        Our Quality Promise
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm">
          At Nine Carats, we are committed to delivering the highest quality
          jewelry that meets the most stringent standards of excellence. Our
          quality promise encompasses every aspect of our craftsmanship and
          service.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              Diamond Quality Standards
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Only GIA certified diamonds of VS clarity or higher
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Color grades of H or better for maximum brilliance
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Expert selection by our master gemologists
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              Craftsmanship Excellence
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Handcrafted by master artisans with decades of experience
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Precision setting techniques for optimal diamond security
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Rigorous quality control at every stage of production
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-header text-gray-900 mb-2">
              Ethical Sourcing
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Conflict-free diamonds from certified sources
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Responsible mining practices and fair trade
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                Full traceability from mine to market
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <p className="text-gray-700 text-sm">
            Every piece of Nine Carats jewelry comes with a certificate of
            authenticity and our personal guarantee of quality. We stand behind
            every piece we create.
          </p>
        </div>
      </div>
    </div>
  );
}
