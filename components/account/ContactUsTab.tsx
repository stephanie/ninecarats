"use client";

import { useRouter } from "next/navigation";

export default function ContactUsTab() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl text-gray-900">Contact us</h2>
      </div>

      {/* Contact Information */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <p className="text-gray-600 leading-relaxed">
          Our team of experts is available to answer all your questions, from
          assistance with your orders to style advice and gift ideas.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-gray-900">
              Call us:{" "}
              <a
                href="tel:+442074919999"
                className="underline hover:text-gray-700 transition-colors"
              >
                +852 9861 1934
              </a>
            </p>
            <p className="text-sm text-gray-600">
              (Monday - Saturday 10am to 6pm)
            </p>
          </div>

          <div>
            <p className="text-gray-900">
              Email:{" "}
              <a
                href="mailto:info@ninecarats.com"
                className="underline hover:text-gray-700 transition-colors"
              >
                info@ninecarats.com
              </a>
            </p>
          </div>

          <div>
            <p className="text-gray-900">
              If you would like to discuss press enquiries, please contact:{" "}
              <a
                href="mailto:press@ninecarats.com"
                className="underline hover:text-gray-700 transition-colors"
              >
                press@ninecarats.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <button className="border border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-200">
            Send us a message
          </button>
        </div>
      </div>

      {/* Back to Account overview */}
      <div className="text-center pt-6">
        <button
          onClick={() => router.push("/account")}
          className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
        >
          Back to Account overview
        </button>
      </div>
    </div>
  );
}
