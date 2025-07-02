"use client";
import { useState } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const menu = [
  { title: "Customer Care", items: [] },
  { title: "Client Services", items: [] },
  { title: "Our Company", items: [] },
  { title: "Legal & Privacy", items: [] },
];

export default function MobileFooter() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="divide-y divide-neutral-200 py-5 px-4">
        {menu.map((section, idx) => (
          <div key={section.title}>
            <button
              className="w-full flex items-center justify-between py-5 text-sm font-normal focus:outline-none"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
            >
              {section.title}
              <span
                className={`transition-transform ${open === idx ? "rotate-180" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                >
                  {" "}
                  <path d="M7 1L4 4L1 1" stroke="currentColor" />{" "}
                </svg>
              </span>
            </button>
            {/* Example: You can add menu items here if needed */}
            {/* {open === idx && (
              <div className="px-6 pb-4 text-sm text-neutral-600">
                {section.items.map(item => <div key={item}>{item}</div>)}
              </div>
            )} */}
          </div>
        ))}
      </div>
      <div className="py-8 text-center text-sm">
        Shipping to <span className="underline">Hong Kong SAR ($)</span>
      </div>
      <div className="flex flex-row justify-between px-6 border-t border-neutral-200 pt-6">
        <div className="flex justify-center gap-4 text-md mb-4">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <div className="text-center text-neutral-400 text-xs">
          © NINE CARATS 2025
        </div>
      </div>
    </div>
  );
}
