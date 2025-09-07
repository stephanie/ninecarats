"use client";

type TabType = "help" | "contact";

interface HelpDialogTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function HelpDialogTabs({
  activeTab,
  onTabChange,
}: HelpDialogTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4 gap-8">
      <button
        onClick={() => onTabChange("help")}
        className={`px-4 py-2 text-sm border-b-2 transition-colors cursor-pointer ${
          activeTab === "help"
            ? "border-gray-900 text-gray-900 font-medium"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Help
      </button>
      <button
        onClick={() => onTabChange("contact")}
        className={`px-4 py-2 text-sm border-b-2 transition-colors cursor-pointer ${
          activeTab === "contact"
            ? "border-gray-900 text-gray-900 font-medium"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Contact
      </button>
    </div>
  );
}
