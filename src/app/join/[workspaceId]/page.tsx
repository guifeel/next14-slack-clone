"use client";

import { useGetWorkspaceInfo } from "@/app/features/workspaces/api/useGetWorkspaceInfo";
import { useJoin } from "@/app/features/workspaces/api/useJoin";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import VerificationInput from "react-verification-input";
import { toast } from "sonner";

const JoinPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const { mutate, isPending } = useJoin();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleComplete = (value: string) => {
    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success("加入工作空间成功");
        },
        onError: () => {
          toast.error("加入工作空间失败");
        },
      }
    );
  };

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <Image src="vercel.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">加入工作空间:{data?.name}</h1>
          <p className="text-sm text-muted-foreground">请输入工作空间邀请码</p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          length={6}
          autoFocus
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "text-black bg-white",
            characterFilled: "text-black bg-white",
          }}
        />
      </div>
    </div>
  );
};

export default JoinPage;
