import { useProfileMemmberId } from "@/app/features/memebers/store/useProfileMemberId";
import { useParentMessageId } from "@/app/features/messages/store/useParentMessageId";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId();
  const [profileMemberId, setProfileMemberId] = useProfileMemmberId();

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId);
    setProfileMemberId(null);
  };

  const onOpenProfile = (messageId: string) => {
    setProfileMemberId(messageId);
    setParentMessageId(null);
  };

  const onClose = () => {
    setProfileMemberId(null);
    setParentMessageId(null);
  };

  return {
    parentMessageId,
    onOpenMessage,
    profileMemberId,
    onOpenProfile,
    onClose,
  };
};
