"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  zIndex?: number;
  width?: string;
  position?: "right" | "left";
}

export default function Sidebar({
  isOpen,
  onClose,
  title,
  children,
  zIndex = 50,
  width = "max-w-md",
  position = "right",
}: SidebarProps) {
  const positionClasses =
    position === "right" ? "right-0 pl-10" : "left-0 pr-10";

  const slideDirection =
    position === "right"
      ? {
          enterFrom: "translate-x-full",
          enterTo: "translate-x-0",
          leaveFrom: "translate-x-0",
          leaveTo: "translate-x-full",
        }
      : {
          enterFrom: "-translate-x-full",
          enterTo: "translate-x-0",
          leaveFrom: "translate-x-0",
          leaveTo: "-translate-x-full",
        };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={`relative z-${zIndex}`} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgb(217_41_31)]/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-y-0 ${positionClasses} flex max-w-full`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={slideDirection.enterFrom}
                enterTo={slideDirection.enterTo}
                leave="transform transition ease-in-out duration-500"
                leaveFrom={slideDirection.leaveFrom}
                leaveTo={slideDirection.leaveTo}
              >
                <Dialog.Panel className={`pointer-events-auto ${width}`}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-8 shadow-xl">
                    <div className="px-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-sm text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-8">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
