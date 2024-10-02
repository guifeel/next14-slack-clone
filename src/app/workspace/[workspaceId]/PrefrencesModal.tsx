"use client";

import { useRemoveWorkspace } from "@/app/features/workspaces/api/useRemoveWorkspace";
import { useUpdateWorkspace } from "@/app/features/workspaces/api/useUpdateWorkspace";
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
import { useConfirm } from "@/hooks/useConfirm";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PrefrenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

const PrefrenceModal = ({
  open,
  setOpen,
  initialValue,
}: PrefrenceModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm2] = useConfirm(
    "你确定要这样做吗？",
    "这将删除这个工作区"
  );

  const [value, setValue] = useState(initialValue);

  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemoveWorkspace } =
    useRemoveWorkspace();

  const handleRemove = async () => {
    const ok = await confirm2();
    console.log(ok);
    if (!ok) return;

    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          toast.success("工作区删除成功！");
          router.replace("/");
        },
        onError: () => {
          toast.error("工作区删除失败！");
        },
      }
    );
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("工作区名称更新成功！");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("工作区更新失败！");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">工作区名称</p>
                    <p className="text-sm font-semibold text-[#1264A3] hover:underline">
                      编辑
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>重命名工作区</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="space-y-4">
                  <Input
                    value={value}
                    placeholder="请输入想要修改的名称"
                    onChange={(e) => setValue(e.target.value)}
                    minLength={3}
                    maxLength={80}
                    disabled={isUpdatingWorkspace}
                    required
                    autoFocus
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkspace}>
                        取消
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>保存</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              onClick={handleRemove}
              disabled={isRemoveWorkspace}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-500"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">删除工作区</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrefrenceModal;
