"use client";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import InviteModal from "./InviteModal";
import PrefrencesModal from "./PrefrencesModal";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace.name}
        joinCode={workspace.joinCode}
      />
      <PrefrencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparant"
              size="sm"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] flex justify-center items-center font-semibold text-xl rounded-md mr-2 text-white">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col justify-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-sm text-muted-foreground">已激活</p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setInviteOpen(true)}
                >
                  邀请加入“{workspace.name}”
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setPreferencesOpen(true)}
                >
                  编辑工作区
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="过滤对话" side="bottom">
            <Button variant="transparant" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint label="发送消息" side="bottom">
            <Button variant="transparant" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkspaceHeader;
