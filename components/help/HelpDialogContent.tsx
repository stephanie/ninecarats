"use client";

import { HelpOptionBox } from "./HelpOptionBox";
import { ContactInfo } from "./shared/ContactInfo";
import { QualityPromise } from "./shared/QualityPromise";
import { Warranty } from "./shared/Warranty";

type TabType = "help" | "contact";
type HelpSectionType = "main" | "quality" | "warranty" | "faq";

interface HelpDialogContentProps {
  activeTab: TabType;
  helpSection: HelpSectionType;
  helpOptions: any[];
  onWhatsApp: () => void;
  onBackToMain: () => void;
}

export function HelpDialogContent({
  activeTab,
  helpSection,
  helpOptions,
  onWhatsApp,
  onBackToMain,
}: HelpDialogContentProps) {
  return (
    <>
      {activeTab === "help" && (
        <div className="space-y-4">
          {helpSection === "main" && <HelpOptionBox options={helpOptions} />}

          {helpSection === "quality" && (
            <div>
              <button
                onClick={onBackToMain}
                className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Help
              </button>
              <QualityPromise />
            </div>
          )}

          {helpSection === "warranty" && (
            <div>
              <button
                onClick={onBackToMain}
                className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Help
              </button>
              <Warranty />
            </div>
          )}

          {helpSection === "faq" && (
            <div>
              <button
                onClick={onBackToMain}
                className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Help
              </button>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      How do I care for my jewelry?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Clean your jewelry with a soft cloth and avoid harsh
                      chemicals. Store in a dry place and have it professionally
                      cleaned annually.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      What is your return policy?
                    </h3>
                    <p className="text-sm text-gray-600">
                      We offer a 30-day return policy for unworn items in
                      original condition. Custom pieces are final sale.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Do you offer custom designs?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Yes, we create custom jewelry pieces. Contact our design
                      team to discuss your vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "contact" && <ContactInfo onSendMessage={onWhatsApp} />}
    </>
  );
}
