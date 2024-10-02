"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/hooks/usePanel";
import WorkspaceSidebar from "./WorkspaceSidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, onClose } = usePanel();

  const showPanel = !!parentMessageId;

  return (
    <div className="h-full">
      <Toolbar />
      <div className="h-[calc(100vh-40px)] flex">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="ca-workspace-layout"
        >
          <ResizablePanel defaultSize={15} minSize={5} className="bg-[#5E2C5F]">
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={20} defaultSize={80}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                支线回复
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
