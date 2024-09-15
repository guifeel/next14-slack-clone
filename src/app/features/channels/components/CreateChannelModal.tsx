"use client";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateChannel } from "../api/useCreateChannel";
import { useCreateChannelModal } from "../store/useCreateChannelModal";

const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateChannel();
  const [open, setOpen] = useCreateChannelModal();

  const [name, setName] = useState("");

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 输入空格替换为-----
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
        workspaceId,
      },
      {
        onSuccess: (id) => {
          // TODO：重定向至新频道
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建频道</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={handleChange}
            placeholder="创建一个频道"
            minLength={3}
            maxLength={80}
            disabled={isPending}
            required
            autoFocus
          />
          <div className="flex justify-end">
            <Button disabled={false}>创建</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
