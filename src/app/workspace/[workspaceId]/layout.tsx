"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="h-[calc(100vh-40px)] flex ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
