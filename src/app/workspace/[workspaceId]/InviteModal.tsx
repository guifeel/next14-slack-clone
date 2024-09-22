import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyIcon } from "lucide-react";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>邀请朋友加入到你的频道{name}</DialogTitle>
          <DialogDescription>
            使用下方的邀请码邀请你的朋友加入！
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-4">
          <p className="text-4xl uppercase tracking-widest font-bold">
            {joinCode}
          </p>
          <Button variant="ghost" size="sm">
            复制链接
            <CopyIcon className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
