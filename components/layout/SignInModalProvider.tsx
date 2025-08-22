"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import CustomerSignInModal from "../customer/CustomerSignInModal";

interface SignInModalContextType {
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
}

const SignInModalContext = createContext<SignInModalContextType | undefined>(
  undefined
);

export function useSignInModal() {
  const context = useContext(SignInModalContext);
  if (context === undefined) {
    throw new Error("useSignInModal must be used within a SignInModalProvider");
  }
  return context;
}

export function SignInModalProvider({ children }: { children: ReactNode }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  return (
    <SignInModalContext.Provider
      value={{ isSignInModalOpen, openSignInModal, closeSignInModal }}
    >
      {children}
      <CustomerSignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
      />
    </SignInModalContext.Provider>
  );
}
