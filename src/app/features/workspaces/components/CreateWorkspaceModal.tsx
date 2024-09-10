"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";

const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(false);

    // TODO: Clear form
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建工作空间</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value=""
            placeholder="请出入工作空间的名称，如'主页'，'工作'，'个人'。"
            minLength={3}
            disabled={false}
            required
            autoFocus
          />
          <div className="flex justify-end">
            <Button>创建</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
