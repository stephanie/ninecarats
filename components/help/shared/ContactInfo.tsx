"use client";

import { ButtonDark } from "components/ui/ButtonDark";

interface ContactInfoProps {
  className?: string;
  showSendMessageButton?: boolean;
  onSendMessage?: () => void;
}

export function ContactInfo({
  className = "",
  showSendMessageButton = true,
  onSendMessage,
}: ContactInfoProps) {
  const handleSendMessage = () => {
    if (onSendMessage) {
      onSendMessage();
    } else {
      // Default WhatsApp behavior
      window.open("https://wa.me/85298611934", "_blank");
    }
  };

  return (
    <div className={`space-y-6 text-sm ${className}`}>
      <p className="text-gray-600 leading-relaxed">
        Our team of experts is available to answer all your questions, from
        assistance with your orders to style advice and gift ideas.
      </p>

      <div className="space-y-4">
        <div>
          <p className="text-gray-900">
            Call us:{" "}
            <a
              href="tel:+85298611934"
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

      {showSendMessageButton && (
        <div className="pt-2">
          <ButtonDark onClick={handleSendMessage} className="gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M15 29C22.7322 29 29 22.7322 29 15C29 7.2678 22.7322 1 15 1C7.2678 1 1 7.2678 1 15C1 17.5494 1.6818 19.942 2.8732 22L1.7 28.3L8 27.1268C10.1275 28.3572 12.5424 29.0034 15 29Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.2096 16.4642L15.9779 16.8967C14.4702 16.1402 13.5392 15.2709 12.9973 13.916L13.4145 11.6779L12.626 9.58057H10.5932C9.98193 9.58057 9.50069 10.0857 9.59227 10.6899C9.81989 12.1981 10.4919 14.9333 12.4553 16.8967C14.5174 18.9588 17.4877 19.8535 19.1222 20.2095C19.7536 20.3467 20.3134 19.8546 20.3134 19.208V17.2658L18.2096 16.4642Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Send us a message
          </ButtonDark>
        </div>
      )}
    </div>
  );
}
