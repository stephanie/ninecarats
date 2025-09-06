"use client";

import { useState } from "react";
import { FloatingHelpButton } from "./FloatingHelpButton";
import { HelpDialog } from "./HelpDialog";

export function HelpSystem() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <FloatingHelpButton
        onClick={isDialogOpen ? handleCloseDialog : handleOpenDialog}
        isDialogOpen={isDialogOpen}
      />
      <HelpDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}
