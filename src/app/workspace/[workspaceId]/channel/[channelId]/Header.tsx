"use client";
import { useRemoveChannel } from "@/app/features/channels/api/useRemoveChannel";
import { useUpdateChannel } from "@/app/features/channels/api/useUpdateChannel";
import { useCurrentMember } from "@/app/features/memebers/api/useCurrentMember";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useChannelId } from "@/hooks/useChannelId";
import { useConfirm } from "@/hooks/useConfirm";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { DialogDescription } from "@radix-ui/react-dialog";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(title);

  const [ConfirmDialog, confirm] = useConfirm(
    "你确定要删除这个频道吗？",
    "删除操作是不可逆的？"
  );

  const { data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: updateChannelPending } =
    useUpdateChannel();
  const { mutate: removeChannel, isPending: removeChannelPending } =
    useRemoveChannel();

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("频道删除成功");
          router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("频道删除失败");
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success("频道名称更新成功");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("频道名称更新失败");
        },
      }
    );
  };

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;
    setEditOpen(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 输入空格替换为-----
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };
  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
            variant="ghost"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogDescription># {title}</DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2 ">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="border rounded-lg flex flex-col px-5 py-4 bg-white cursor-pointer hover:bg-gray-50 ">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">频道名称</p>
                    {member?.role === "admin" && (
                      <p className="text-sm hover:underline font-semibold text-blue-500">
                        编辑
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground "># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>重命名</DialogTitle>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    value={value}
                    disabled={updateChannelPending}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="请输入新的频道名称"
                  />
                  <DialogFooter>
                    {/* 如果没有asChild，这里的关闭会出发handleSubmit */}
                    <DialogClose asChild>
                      <Button variant="outline" disabled={updateChannelPending}>
                        取消
                      </Button>
                    </DialogClose>
                    <Button disabled={updateChannelPending}>保存</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === "admin" && (
              <button
                onClick={handleDelete}
                className="flex gap-x-2 px-5 py-4 border rounded-lg items-center text-rose-500 bg-white cursor-pointer hover:bg-gray-50"
              >
                <TrashIcon className="size-4 " />
                <p className="text-sm font-semibold">删除</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
