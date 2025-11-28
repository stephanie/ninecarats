import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Diamonds | Nine Carats",
  description:
    "Discover why we only use the highest grade lab-grown diamonds. Learn about our commitment to exceptional quality, sustainability, and ethical practices in fine jewelry.",
};

export default function OurDiamondsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
