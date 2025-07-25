import Link from "next/link";

interface LabelProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Label({ href, children, className = "" }: LabelProps) {
  return (
    <Link
      href={href}
      className={`mt-1 px-2 py-1 border-b border-neutral-400 text-neutral-800 text-sm tracking-wide hover:border-black transition ${className}`}
    >
      {children}
    </Link>
  );
}
