import { useGetWorkspace } from "@/app/features/workspaces/api/useGetWorkspace";
import { useGetWorkspaces } from "@/app/features/workspaces/api/useGetWorkspaces";
import { useCreateWorkspaceModal } from "@/app/features/workspaces/store/useCreateWorkspaceModal";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkspaceSwitcher = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <Hint label="查看工作区列表">
        <DropdownMenuTrigger asChild>
          <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
            {workspaceLoading ? (
              <Loader className="size-5 shrink-0 animate-spin" />
            ) : (
              workspace?.name.charAt(0).toUpperCase()
            )}
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex flex-col justify-center items-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">已激活</span>
        </DropdownMenuItem>

        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize"
            onClick={() => router.push(`/workspace/${workspace._id}`)}
          >
            <div className="shrink-0 size-9 rounded-md text-lg relative overflow-hidden bg-[#616061] text-white  font-semibold  flex items-center justify-center mr-2">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 rounded-md text-lg relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold  flex items-center justify-center mr-2">
            <Plus />
          </div>
          创建新工作区
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
