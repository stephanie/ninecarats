"use client";

import { Sidebar } from "components/ui/Sidebar";
import { useState } from "react";

interface DiamondExpertSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactRow({
  icon,
  label,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center justify-between py-5 border-b border-neutral-200 cursor-pointer group">
      <div className="flex items-center gap-4">
        <span className="text-neutral-700">{icon}</span>
        <span className="text-xs tracking-widest uppercase text-neutral-800">
          {label}
        </span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-400 group-hover:text-neutral-700 transition-colors"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button className="w-full text-left" onClick={onClick}>
      {inner}
    </button>
  );
}

export function DiamondExpertSidebar({
  isOpen,
  onClose,
}: DiamondExpertSidebarProps) {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Your Diamond Advisor"
      hideDefaultHeader={false}
    >
      <div className="mt-6">
        <p className="text-sm text-neutral-600 leading-relaxed mb-8 text-center">
          From selecting the perfect diamond to personalised styling advice, our
          advisors are always here to help.
        </p>

        <div className="border-t border-neutral-200">
          <ContactRow
            href="tel:+85298611934"
            label="Call us (+852 9861 1934)"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047c.42 2.783 1.66 7.83 5.283 11.453c3.805 3.805 9.286 5.456 12.302 6.113c1.165.253 2.198-.655 2.198-1.848v-3.584z"
                />
              </svg>
            }
          />

          <ContactRow
            href="https://wa.me/85298611934"
            label="WhatsApp us"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15 29C22.7322 29 29 22.7322 29 15C29 7.2678 22.7322 1 15 1C7.2678 1 1 7.2678 1 15C1 17.5494 1.6818 19.942 2.8732 22L1.7 28.3L8 27.1268C10.1275 28.3572 12.5424 29.0034 15 29Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.2096 16.4642L15.9779 16.8967C14.4702 16.1402 13.5392 15.2709 12.9973 13.916L13.4145 11.6779L12.626 9.58057H10.5932C9.98193 9.58057 9.50069 10.0857 9.59227 10.6899C9.81989 12.1981 10.4919 14.9333 12.4553 16.8967C14.5174 18.9588 17.4877 19.8535 19.1222 20.2095C19.7536 20.3467 20.3134 19.8546 20.3134 19.208V17.2658L18.2096 16.4642Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <ContactRow
            href="mailto:info@ninecarats.com"
            label="Email us"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m7 9l5 3.5L17 9"
                  />
                  <path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                </g>
              </svg>
            }
          />

          <ContactRow
            label="Visit our showroom by appointment"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1 1 16 0Z" />
                  <path
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                  />
                </g>
              </svg>
            }
          />
        </div>

        <p className="text-xs text-neutral-500 mt-6 text-center">
          Available Monday to Friday, 10am to 6pm (HKT)
        </p>
      </div>
    </Sidebar>
  );
}

export function ContactDiamondExpertButton() {
  const [isOpen, setIsOpen] = useState(false);
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="w-4 h-4"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047c.42 2.783 1.66 7.83 5.283 11.453c3.805 3.805 9.286 5.456 12.302 6.113c1.165.253 2.198-.655 2.198-1.848v-3.584z"
      />
    </svg>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="gap-2 w-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-300 text-neutral-800 text-base tracking-wide py-4 px-6 flex items-center justify-center uppercase cursor-pointer"
      >
        {svg}
        Contact your diamond advisor
      </button>
      <DiamondExpertSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
