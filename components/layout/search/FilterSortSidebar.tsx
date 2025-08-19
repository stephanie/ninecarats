"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { sorting } from "lib/constants";
import { Fragment } from "react";
import FilterList from "./filter";

interface FilterSortSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collections?: any[]; // Add collections as a prop
}

export default function FilterSortSidebar({
  isOpen,
  onClose,
  collections = [],
}: FilterSortSidebarProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-8 shadow-xl">
                    <div className="px-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-md font-medium text-gray-900">
                          Filter & Sort
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
                    <div className="relative mt-6 flex-1 px-8">
                      <div className="space-y-8">
                        {/* Sort Options */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-4">
                            Sort by
                          </h3>
                          <FilterList list={sorting} title="" />
                        </div>

                        {/* Filter Options - Placeholder for future filters */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-4">
                            Category
                          </h3>
                          <div className="space-y-4">
                            {collections.length > 0 ? (
                              <FilterList list={collections} title="" />
                            ) : (
                              <div className="text-sm text-gray-500">
                                No categories available
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
