import NewsletterSignup from "components/layout/NewsletterSignup";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

const navLinks = [
  { title: "Contact us", href: "/contact" },
  { title: "About our maison", href: "/about" },
  { title: "Shop our collection", href: "/search/all-products" },
];

const socialLinks = [
  { title: "Instagram", href: "http://instagram.com/ninecaratsofficial" },
  { title: "LinkedIn", href: "#" },
];

const legalLinks = [{ title: "Privacy policy", href: "/privacy-policy" }];

export default function Footer() {
  return (
    <footer className="w-full pt-24 text-neutral-800 bg-primary mt-4 text-white">
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
                className="uppercase tracking-widest text-xs md:text-sm"
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
                className="uppercase tracking-widest text-xs md:text-sm text-neutral-300 transition"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-300 max-w-[98vw] mx-auto" />

        {/* Bottom Bar */}
        <div className="w-full px-4 text-xs text-neutral-300 gap-2 p-8">
          <div className="max-w-6xl mx-auto flex flex-row justify-between">
            {legalLinks.map((link, idx) => (
              <Link key={idx} href={link.href}>
                {link.title}
              </Link>
            ))}
            <div className=" mt-2 md:mt-0">© NINECARATS 2025</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
