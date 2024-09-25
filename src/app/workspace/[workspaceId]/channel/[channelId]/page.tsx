"use client";
import { useGetChannel } from "@/app/features/channels/api/useGetChannel";
import { useChannelId } from "@/hooks/useChannelId";
import { Loader, TriangleAlert } from "lucide-react";
import ChatInput from "./ChatInput";
import Header from "./Header";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading)
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );

  if (!channel)
    return (
      <div className="h-full flex-1 flex flex-col gap-y-4 items-center justify-center">
        <TriangleAlert className="size-5  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">未找到频道</span>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
