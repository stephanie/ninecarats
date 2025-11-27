"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Content Section */}
      <section className="w-full min-h-screen flex items-start justify-center py-42 md:py-36 px-4 md:px-8">
        <div className="max-w-4xl w-full">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-header mb-6 text-center">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 text-center mb-8">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="max-w-4xl text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to Nine Carats ("we," "our," or "us"). We are committed
                to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, make a purchase, or interact with our
                services.
              </p>
              <p className="mt-4">
                By using our website or services, you agree to the collection
                and use of information in accordance with this policy. If you do
                not agree with our policies and practices, please do not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg mt-6 mb-3">2.1 Personal Information</h3>
              <p className="mb-4">
                We may collect the following types of personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Contact Information: Name, email address, phone number,
                  mailing address
                </li>
                <li>
                  Account Information: Username, password, account preferences
                </li>
                <li>
                  Payment Information: Credit card details, billing address,
                  payment history (processed securely through our payment
                  processors)
                </li>
                <li>
                  Order Information: Purchase history, product preferences,
                  shipping details
                </li>
                <li>
                  Communication Data: Correspondence with our customer service
                  team, feedback, and survey responses
                </li>
              </ul>

              <h3 className="text-lg mt-6 mb-3">
                2.2 Automatically Collected Information
              </h3>
              <p className="mb-4">
                When you visit our website, we automatically collect certain
                information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Device Information: IP address, browser type, device type,
                  operating system
                </li>
                <li>
                  Usage Data: Pages visited, time spent on pages, click
                  patterns, search queries
                </li>
                <li>
                  Cookies and Tracking Technologies: See our Cookie Policy for
                  more details
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To process and fulfill your orders, including payment
                  processing and shipping
                </li>
                <li>
                  To communicate with you about your orders, account, and our
                  services
                </li>
                <li>
                  To provide customer support and respond to your inquiries
                </li>
                <li>
                  To send you marketing communications (with your consent, where
                  required)
                </li>
                <li>To improve our website, products, and services</li>
                <li>To detect and prevent fraud, abuse, and security issues</li>
                <li>
                  To comply with legal obligations and enforce our terms of
                  service
                </li>
                <li>
                  To personalize your shopping experience and recommend products
                </li>
                <li>To analyze website usage and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                4. How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>

              <h3 className="text-lg mt-6 mb-3">4.1 Service Providers</h3>
              <p className="mb-4">
                We may share information with third-party service providers who
                perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (e.g., Shopify Payments)</li>
                <li>Shipping and logistics companies</li>
                <li>Email service providers</li>
                <li>Analytics and marketing platforms</li>
                <li>Customer support tools</li>
              </ul>
              <p className="mt-4">
                These service providers are contractually obligated to protect
                your information and use it only for the purposes we specify.
              </p>

              <h3 className="text-lg mt-6 mb-3">4.2 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information if required by law, court
                order, or government regulation, or if we believe disclosure is
                necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal obligations</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or security threats</li>
                <li>Respond to government requests</li>
              </ul>

              <h3 className="text-lg mt-6 mb-3">4.3 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred to the acquiring entity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                5. Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>
                  Secure payment processing through PCI-compliant providers
                </li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or
                electronic storage is 100% secure. While we strive to protect
                your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                6. Your Rights and Choices
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Access: Request access to the personal information we hold
                  about you
                </li>
                <li>
                  Correction: Request correction of inaccurate or incomplete
                  information
                </li>
                <li>
                  Deletion: Request deletion of your personal information
                  (subject to legal requirements)
                </li>
                <li>
                  Portability: Request transfer of your data to another service
                  provider
                </li>
                <li>
                  Opt-out: Unsubscribe from marketing communications at any time
                </li>
                <li>Objection: Object to certain processing activities</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:info@ninecarats.com"
                  className="underline hover:text-gray-900"
                >
                  info@ninecarats.com
                </a>{" "}
                or call us at{" "}
                <a
                  href="tel:+85298611934"
                  className="underline hover:text-gray-900"
                >
                  +852 9861 1934
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze website traffic, and personalize
                content. For detailed information about our use of cookies,
                please see our{" "}
                <a
                  href="/cookie-policy"
                  className="underline hover:text-gray-900"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                8. International Data Transfers
              </h2>
              <p>
                Nine Carats operates from Hong Kong. If you are located outside
                of Hong Kong, please note that we may transfer your information
                to Hong Kong and process it there. By using our services, you
                consent to the transfer of your information to Hong Kong.
              </p>
              <p>
                We take appropriate measures to ensure that your information
                receives an adequate level of protection in accordance with
                applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                9. Children's Privacy
              </h2>
              <p>
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you believe we have inadvertently collected
                information from a child, please contact us immediately, and we
                will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                10. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law. When we
                no longer need your information, we will securely delete or
                anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any material changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. We encourage you
                to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-header mt-8 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@ninecarats.com"
                    className="underline hover:text-gray-900"
                  >
                    info@ninecarats.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+85298611934"
                    className="underline hover:text-gray-900"
                  >
                    +852 9861 1934
                  </a>{" "}
                  (Monday - Saturday 10am to 6pm)
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
