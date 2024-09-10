"use client";

import CreateWorkspaceModal from "@/app/features/workspaces/components/CreateWorkspaceModal";
import { useEffect, useState } from "react";

const Modal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <CreateWorkspaceModal />
    </div>
  );
};

export default Modal;
