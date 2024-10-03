"use client";

import { useCreateOrGetConversation } from "@/app/features/conversations/api/useCreateOrGetConversation";
import useMemberId from "@/hooks/useMemberId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";
import Conversation from "./Conversation";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      {
        workspaceId,
        memberId,
      },
      {
        onSuccess(data) {
          setConversationId(data);
        },
        onError() {
          toast.error("创建或查找对话失败");
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    <div className="h-full flex items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>;
  }

  if (!conversationId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertTriangle className=" size-4 mr-1 text-foreground" />
        <p className="text-sm text-muted-foreground">未找到该对话</p>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
