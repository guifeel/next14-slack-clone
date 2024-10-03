import { useGetMember } from "@/app/features/memebers/api/useGetMember";
import { useGetMessages } from "@/app/features/messages/api/useGetMessages";
import useMemberId from "@/hooks/useMemberId";
import { Loader } from "lucide-react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import Header from "./Header";

interface ConversationProps {
  id: Id<"conversations">;
}

const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();

  const {
    data: member,
    isLoading,
    memberLoading,
  } = useGetMember({ id: memberId });
  const { results, status, loadMore } = useGetMessages({ conversationId: id });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />
    </div>
  );
};

export default Conversation;
