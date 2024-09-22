import { useNewJoinCode } from "@/app/features/workspaces/api/useNewJoinCode";
import { useConfirm } from "@/components/hooks/useConfirm";
import { useWorkspaceId } from "@/components/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "你确定这样吗？",
    "这将去激活现有成员。"
  );

  const { mutate, isPending } = useNewJoinCode();

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("邀请码更新成功!");
        },
        onError: () => {
          toast.error("邀请码更新失败！");
        },
      }
    );
  };

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("诉请链接已经复制到剪切版！"));
  };

  return (
    <>
      <ConfirmDialog />
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
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              复制链接
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleNewCode}
            >
              更新邀请码
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>关闭</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteModal;
