import NewsletterSignup from "components/layout/NewsletterSignup";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

const navLinks = ["Contact Us", "Join Our Maison", "Services", "FAQs"];

const socialLinks = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

const legalLinks = [
  "Legal",
  "Privacy Policy",
  "Cookie Policy",
  "Conditions of Sale",
  "Site Map",
];

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-2 text-neutral-800 bg-white">
      <NewsletterSignup />
      <div className="md:hidden">
        <MobileFooter />
      </div>
      <div className="hidden md:block">
        {/* Main Footer Grid - Centered Nav Links */}
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 px-4 mb-8">
          <nav className="w-full flex flex-wrap justify-center gap-x-10 gap-y-2 mb-2">
            {navLinks.map((label, idx) => (
              <Link
                key={label}
                href="#"
                className="uppercase tracking-widest text-xs md:text-sm text-neutral-500 hover:text-neutral-700 transition"
              >
                {label}
              </Link>
            ))}
          </nav>
          <nav className="w-full flex flex-wrap justify-center gap-x-8 gap-y-2 pb-8">
            {socialLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="uppercase tracking-widest text-xs md:text-sm text-neutral-400 hover:text-neutral-700 transition"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 my-6" />

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-xs text-neutral-400 gap-2 pb-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1 mb-2 md:mb-0">
            {legalLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="hover:text-neutral-700 transition"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="tracking-wide text-neutral-500 mt-2 md:mt-0">
            © NINECARATS 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
