"use client";

import { ContactInfo } from "components/help/shared/ContactInfo";
import { useRouter } from "next/navigation";

export default function ContactUsTab() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl text-gray-900 font-header">Contact us</h2>
      </div>

      {/* Contact Information */}
      <div className="max-w-md mx-auto text-center">
        <ContactInfo />
      </div>

      {/* Back to Account overview */}
      <div className="text-center pt-6">
        <button
          onClick={() => router.push("/account?tab=overview")}
          className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
        >
          Back to Account overview
        </button>
      </div>
    </div>
  );
}
