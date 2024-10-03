"use client";

import useMemberId from "@/hooks/useMemberId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  return <div>{JSON.stringify({ memberId, workspaceId })}</div>;
};

export default MemberIdPage;
