"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateWorkspace } from "../api/useCreateWorkspace";
import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, isPending } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);

    setName("");
  };

  const handleSumbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success("工作区创建成功！ ");
          router.push(`/workspace/${id}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建工作区</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSumbmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请出入工作区的名称，如'主页'，'工作'，'个人'。"
            minLength={3}
            disabled={isPending}
            required
            autoFocus
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>创建</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
