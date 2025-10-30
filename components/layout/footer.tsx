import NewsletterSignup from "components/layout/NewsletterSignup";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

const navLinks = [
  { title: "Contact us", href: "/contact" },
  { title: "About our maison", href: "/about" },
  { title: "Shop our collection", href: "/search?q=" },
  { title: "FAQs", href: "/faqs" },
];

const socialLinks = [
  { title: "Instagram", href: "/instagram" },
  { title: "Facebook", href: "/facebook" },
  { title: "LinkedIn", href: "/linkedin" },
];

const legalLinks = [
  { title: "Privacy policy", href: "/privacy-policy" },
  { title: "Cookie policy", href: "/cookie-policy" },
  { title: "Conditions of sale", href: "/conditions-of-sale" },
];

export default function Footer() {
  return (
    <footer className="w-full pt-24 pb-2 text-neutral-800 bg-white">
      <NewsletterSignup />
      <div className="md:hidden">
        <MobileFooter />
      </div>
      <div className="hidden md:block">
        {/* Main Footer Grid - Centered Nav Links */}
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 px-4 mb-8">
          <nav className="w-full flex flex-wrap justify-center gap-x-10 gap-y-2 mb-2">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="uppercase tracking-widest text-xs md:text-sm text-neutral-500 hover:text-neutral-700 transition"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <nav className="w-full flex flex-wrap justify-center gap-x-8 gap-y-2 pb-8">
            {socialLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="uppercase tracking-widest text-xs md:text-sm text-neutral-400 hover:text-neutral-700 transition"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 my-6" />

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-xs text-neutral-400 gap-2 pb-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1 mb-2 md:mb-0">
            {legalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-neutral-700 transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="text-neutral-400 mt-2 md:mt-0">
            © NINECARATS 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
