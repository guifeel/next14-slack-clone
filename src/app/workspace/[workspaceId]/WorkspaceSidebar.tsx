import { useCurrentMember } from "@/app/features/memebers/api/useCurrentMember";
import { useGetWorkspace } from "@/app/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";
import {
  AlertTriangle,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import WorkspaceHeader from "./WorkspaceHeader";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col h-full text-[#5E2C5F] items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 h-full text-[#5E2C5F] items-center justify-center">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">未找到工作空间</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full text-[#5E2C5F] ">
      {/* 如果.role报错，说明前面要用unique不是collect */}
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="对话列表" icon={MessageSquareText} id="threads" />
        <SidebarItem label="草稿 & 发送" icon={SendHorizonal} id="drafts" />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
