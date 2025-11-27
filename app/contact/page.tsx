"use client";

import { ContactInfo } from "components/help/shared/ContactInfo";
import { useViewportHeight } from "hooks/useViewportHeight";

export default function ContactPage() {
  const viewportHeight = useViewportHeight();

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      {/* <section
        className="relative w-full flex items-center justify-center"
        style={{
          height: viewportHeight
            ? `calc(${viewportHeight}px * 0.6)`
            : "calc(60vh)",
          minHeight: "400px",
        }}
      >
        <div className="z-10 text-center px-4 pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-header text-gray-900">
            Contact us
          </h1>
        </div>
      </section> */}

      {/* Contact Information Section */}
      <section className="w-full bg-white min-h-screen flex items-center justify-center py-16 md:py-28 px-4 md:px-20">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-header mb-4">
              Get in touch
            </h2>
          </div>

          {/* Contact Information */}
          <div className="max-w-md mx-auto">
            <ContactInfo className="text-center" />
          </div>
        </div>
      </section>
    </div>
  );
}
