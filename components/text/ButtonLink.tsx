import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonLink({
  href,
  children,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`mt-1 px-0 py-1 border-b border-neutral-400 text-neutral-800 text-sm tracking-wide hover:border-black transition ${className}`}
    >
      {children}
    </Link>
  );
}
