"use client";
import { useCreateChannelModal } from "@/app/features/channels/store/useCreateChannelModal";
import { useGetChannels } from "@/app/features/workspaces/api/useGetChannels";
import { useGetWorkspace } from "@/app/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkSpaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
  ]);

  if (workspaceLoading || channelsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-full">
        <Loader className="size-6 animate-spin  text-muted-foreground" />
      </div>
    );
  }
  if (workspaceLoading || channelsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-full">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">未找到工作空间</p>
      </div>
    );
  }
  return <div>workspace</div>;
};

export default WorkSpaceIdPage;
