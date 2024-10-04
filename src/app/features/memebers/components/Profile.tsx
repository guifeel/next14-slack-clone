import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Loader, MailIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/useGetMember";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

const Profile = ({ memberId, onClose }: ProfileProps) => {
  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });

  if (isLoadingMember) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className=" size-4 animate-spin text-foreground" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center px-4 border-b h-[49px]">
          <p className="text-lg font-bold">回复</p>
          <Button onClick={onClose} variant="ghost" size="iconSm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertTriangle className=" size-4 mr-1 text-foreground" />
          <p className="text-sm text-muted-foreground">未找到该消息</p>
        </div>
      </div>
    );
  }

  const avatarFallback = member.user.name?.[0] || "无名";
  return (
    <div className="h-full flex flex-col">
      <div className="flex  items-center px-4 border-b h-[49px] justify-between">
        <p className="text-lg font-bold">个人资料</p>
        <Button onClick={onClose} variant="ghost" size="iconSm">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Avatar className="max-w-[256px] max-h-[256px] size-full">
          <AvatarImage src={member.user.image} />
          <AvatarFallback className="aspect-square text-6xl">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col p-4">
        <p className="text-xl font-bold">{member.user.name}</p>
      </div>
      <Separator />
      <div className="flex flex-col p-4">
        <p className="text-sm font-bold mb-4">联系信息</p>
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-muted flex items-center justify-center">
            <MailIcon className="size-4 " />
          </div>
          <div className="flex flex-col ">
            <p className="text-[13px] font-semibold">邮箱地址</p>
            <Link
              href={`mailto:${member.user.email}`}
              className="text-sm hover:underline text-[#1264a3]"
            >
              {member.user.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
