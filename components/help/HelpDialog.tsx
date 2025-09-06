"use client";

import { useState } from "react";
import { HelpOptionBox } from "./HelpOptionBox";
import { ContactInfo } from "./shared/ContactInfo";
import { QualityPromise } from "./shared/QualityPromise";
import { Warranty } from "./shared/Warranty";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "help" | "contact";
type HelpSectionType = "main" | "quality" | "warranty" | "faq";

export function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("help");
  const [helpSection, setHelpSection] = useState<HelpSectionType>("main");

  const handleWhatsApp = () => {
    window.open("https://wa.me/85298611934", "_blank");
  };

  const handleQualityPromise = () => {
    setHelpSection("quality");
  };

  const handleWarranty = () => {
    setHelpSection("warranty");
  };

  const handleFAQ = () => {
    setHelpSection("faq");
  };

  const handleBackToMain = () => {
    setHelpSection("main");
  };

  // Help options configuration
  const helpOptions = [
    {
      id: "whatsapp",
      title: "Send us a message",
      description: "We aim answer your questions within an hour",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M15 29C22.7322 29 29 22.7322 29 15C29 7.2678 22.7322 1 15 1C7.2678 1 1 7.2678 1 15C1 17.5494 1.6818 19.942 2.8732 22L1.7 28.3L8 27.1268C10.1275 28.3572 12.5424 29.0034 15 29Z"
            stroke="#919191"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.2096 16.4642L15.9779 16.8967C14.4702 16.1402 13.5392 15.2709 12.9973 13.916L13.4145 11.6779L12.626 9.58057H10.5932C9.98193 9.58057 9.50069 10.0857 9.59227 10.6899C9.81989 12.1981 10.4919 14.9333 12.4553 16.8967C14.5174 18.9588 17.4877 19.8535 19.1222 20.2095C19.7536 20.3467 20.3134 19.8546 20.3134 19.208V17.2658L18.2096 16.4642Z"
            stroke="#919191"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      onClick: handleWhatsApp,
    },
    {
      id: "quality",
      title: "Our quality promise",
      description: "We only use the highest grade diamonds",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M13.1625 1.31944C13.2651 1.26019 13.3815 1.229 13.5 1.229C13.6184 1.229 13.7348 1.26019 13.8375 1.31944L23.8792 7.11769C23.9819 7.17697 24.0671 7.26225 24.1264 7.36494C24.1856 7.46764 24.2168 7.58413 24.2167 7.70269V19.2981C24.2168 19.4166 24.1856 19.5331 24.1264 19.6358C24.0671 19.7385 23.9819 19.8238 23.8792 19.8831L13.8375 25.6791C13.7348 25.7383 13.6184 25.7695 13.5 25.7695C13.3815 25.7695 13.2651 25.7383 13.1625 25.6791L3.1207 19.8808C3.01803 19.8215 2.93278 19.7363 2.87353 19.6336C2.81428 19.5309 2.78313 19.4144 2.7832 19.2958V7.70269C2.78313 7.58413 2.81428 7.46764 2.87353 7.36494C2.93278 7.26225 3.01803 7.17697 3.1207 7.11769L13.1625 1.31944Z"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.125 16.875H7.875L13.5 7.875L19.125 16.875Z"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5 7.875L2.8125 7.3125L7.875 16.875M13.5 7.875L24.1875 7.3125L19.125 16.875M13.5 7.875V1.125M7.875 16.875L2.8125 19.6875M7.875 16.875L13.5 25.875L19.125 16.875M19.125 16.875L24.1875 19.6875"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      ),
      onClick: handleQualityPromise,
    },
    {
      id: "warranty",
      title: "The Nine Carats Warranty",
      description: "Repairs are always free of charge",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="35"
          viewBox="0 0 23 35"
          fill="none"
        >
          <path
            d="M16.067 14.7231L22.125 1M8.0135 15.027L1 1M13.6116 14.078L7.23188 1M16.21 1L14.52 5.0625M2.625 23.75C2.625 26.3359 3.65223 28.8158 5.48071 30.6443C7.30919 32.4728 9.78914 33.5 12.375 33.5C14.9609 33.5 17.4408 32.4728 19.2693 30.6443C21.0978 28.8158 22.125 26.3359 22.125 23.75C22.125 21.1641 21.0978 18.6842 19.2693 16.8557C17.4408 15.0272 14.9609 14 12.375 14C9.78914 14 7.30919 15.0272 5.48071 16.8557C3.65223 18.6842 2.625 21.1641 2.625 23.75Z"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.36035 23.5593L10.6545 25.8535L16.3898 20.1182"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      onClick: handleWarranty,
    },
    {
      id: "faq",
      title: "FAQs",
      description: "Our most commonly asked questions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M18.4167 18.4167L22.75 22.75M3.25 11.9167C3.25 14.2152 4.16309 16.4196 5.78841 18.0449C7.41372 19.6702 9.61812 20.5833 11.9167 20.5833C14.2152 20.5833 16.4196 19.6702 18.0449 18.0449C19.6702 16.4196 20.5833 14.2152 20.5833 11.9167C20.5833 9.61812 19.6702 7.41372 18.0449 5.78841C16.4196 4.16309 14.2152 3.25 11.9167 3.25C9.61812 3.25 7.41372 4.16309 5.78841 5.78841C4.16309 7.41372 3.25 9.61812 3.25 11.9167Z"
            stroke="#919191"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      onClick: handleFAQ,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Dialog */}
      <div className="bg-white rounded-lg shadow-2xl w-[26rem] max-h-[80vh] overflow-hidden help-dialog-enter mb-4">
        {/* Header */}
        <div className="bg-[#28262B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M0.666992 13.3332L7.00033 6.99984L13.3337 13.3332M13.3337 0.666504L6.99912 6.99984L0.666992 0.666504"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div className="pr-8">
            <h1 className="text-sm font-header font-light mb-2 uppercase mb-12">
              Nine Carats
            </h1>
            <h2 className="text-2xl tracking-wide font-header font-light mb-1">
              Hello
            </h2>
            <p className="text-2xl tracking-wide text-gray-300 font-header">
              How can we help?
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 overflow-y-auto max-h-[60vh]">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 gap-8">
            <button
              onClick={() => setActiveTab("help")}
              className={`px-4 py-2 text-sm border-b-2 transition-colors cursor-pointer ${
                activeTab === "help"
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Help
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2 text-sm border-b-2 transition-colors cursor-pointer ${
                activeTab === "contact"
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "help" && (
            <div className="space-y-4">
              {helpSection === "main" && (
                <HelpOptionBox options={helpOptions} />
              )}

              {helpSection === "quality" && (
                <div>
                  <button
                    onClick={handleBackToMain}
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
                    onClick={handleBackToMain}
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
                    onClick={handleBackToMain}
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
                    <h2 className="text-2xl font-header text-gray-900">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-header text-lg text-gray-900 mb-2">
                          How do I care for my jewelry?
                        </h3>
                        <p className="text-sm text-gray-600">
                          Clean your jewelry with a soft cloth and avoid harsh
                          chemicals. Store in a dry place and have it
                          professionally cleaned annually.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-header text-lg text-gray-900 mb-2">
                          What is your return policy?
                        </h3>
                        <p className="text-sm text-gray-600">
                          We offer a 30-day return policy for unworn items in
                          original condition. Custom pieces are final sale.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-header text-lg text-gray-900 mb-2">
                          Do you offer custom designs?
                        </h3>
                        <p className="text-sm text-gray-600">
                          Yes, we create custom jewelry pieces. Contact our
                          design team to discuss your vision.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <ContactInfo onSendMessage={handleWhatsApp} />
          )}
        </div>
      </div>
    </div>
  );
}
