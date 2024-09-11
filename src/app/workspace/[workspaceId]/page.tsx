"use client";

// interface WorkSpaceIdPageProps {
//   params: { workspaceId: string };
// }

import { useGetWorkspace } from "@/app/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";

// const WorkSpaceIdPage = ({ params }: WorkSpaceIdPageProps) => {
const WorkSpaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return <div>DATA:{JSON.stringify(data)}</div>;
};

export default WorkSpaceIdPage;
