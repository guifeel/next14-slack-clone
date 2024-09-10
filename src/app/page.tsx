"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import UserButton from "./features/auth/components/UserButton";
import { useGetWorkspaces } from "./features/workspaces/api/useGetWorkspaces";
import { useCreateWorkspaceModal } from "./features/workspaces/store/useCreateWorkspaceModal";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal(); // 这里是[]不是{}

  const { data, isLoading } = useGetWorkspaces();

  const workspacesId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspacesId) {
      console.log("重定向至workspace");
      router.replace(`/workspace/${workspacesId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspacesId, isLoading, open, setOpen, router]);

  return (
    <>
      <UserButton />
    </>
  );
}
