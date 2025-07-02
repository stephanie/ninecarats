import Link from "next/link";

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
    <footer className="w-full pt-12 pb-6 text-neutral-800">
      {/* Newsletter Signup */}
      <div className="max-w-3xl mx-auto flex flex-col items-center mb-32 px-4">
        <p className="text-center text-sm md:text-lg mb-8 max-w-[20rem] md:max-w-[25rem]">
          Subscribe for insider access to discover our new collections,
          exclusive events and more.
        </p>
        <form className="w-full flex flex-col flex-row items-center justify-center gap-2">
          <div className="border-b border-neutral-400 w-[15rem] md:w-[20rem] px-2.5 py-2.5 text-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input bg-transparent w-full text-center transition text-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-2 py-2 border-b border-neutral-400 text-neutral-800 text-sm tracking-wide hover:border-black transition"
          >
            Subscribe
          </button>
        </form>
      </div>

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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-xs text-neutral-400 gap-2">
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
          © NINE CARATS 2025
        </div>
      </div>
    </footer>
  );
}
