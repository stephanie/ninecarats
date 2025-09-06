"use client";

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
    <div className={`space-y-6 ${className}`}>
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
          <button
            onClick={handleSendMessage}
            className="border border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm"
          >
            Send us a message
          </button>
        </div>
      )}
    </div>
  );
}
