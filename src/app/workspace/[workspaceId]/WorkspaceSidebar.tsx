import { useCreateChannelModal } from "@/app/features/channels/store/useCreateChannelModal";
import { useCurrentMember } from "@/app/features/memebers/api/useCurrentMember";
import { useGetMembers } from "@/app/features/memebers/api/useGetMembers";
import { useGetChannels } from "@/app/features/workspaces/api/useGetChannels";
import { useGetWorkspace } from "@/app/features/workspaces/api/useGetWorkspace";
import { useChannelId } from "@/components/useChannelId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import UserItem from "./UserItem";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSection from "./WorkspaceSection";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const [_open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoadingg } = useGetMembers({
    workspaceId,
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
      <WorkspaceSection
        label="频道"
        hint="新建频道"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            icon={HashIcon}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="消息列表"
        hint="新的直达"
        // onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            id={item._id}
            key={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
