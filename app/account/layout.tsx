import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Nine Carats",
  description: "Manage your account, orders, and preferences",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
