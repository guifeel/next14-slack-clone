"use client";
import { useCreateMessage } from "@/app/features/messages/api/useCreateWorkspace";
import { useChannelId } from "@/hooks/useChannelId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);

      createMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        { throwError: true }
      );
      console.log({ body, image });
      setEditorKey((preveKey) => preveKey + 1);
    } catch (error) {
      toast.error("消息发送失败");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
