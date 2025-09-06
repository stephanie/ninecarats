"use client";

interface HelpOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface HelpOptionBoxProps {
  options: HelpOption[];
}

export function HelpOptionBox({ options }: HelpOptionBoxProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={option.onClick}
          className="bg-neutral-100 rounded-lg p-5 hover:shadow-sm transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-1 font-header text-xl">
                {option.title}
              </h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              {option.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
