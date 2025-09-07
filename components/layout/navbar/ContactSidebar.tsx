"use client";

import { ContactInfo } from "components/help/shared/ContactInfo";
import { Sidebar } from "components/ui/Sidebar";

interface ContactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSidebar({
  isOpen,
  onClose,
}: ContactSidebarProps) {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Contact us"
      position="right"
      width="w-[400px]"
    >
      <div className="space-y-6 mt-4">
        {/* Contact Information */}
        <ContactInfo />
      </div>
    </Sidebar>
  );
}
