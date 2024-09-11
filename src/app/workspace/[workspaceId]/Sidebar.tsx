import UserButton from "@/app/features/auth/components/UserButton";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarButton from "./SidebarButton";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="主页"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessageSquare} label="消息" />
      <SidebarButton icon={Bell} label="活动" />
      <SidebarButton icon={MoreHorizontal} label="更多" />
      <div className="mt-auto flex flex-col gap-y-1 items-center justify-center">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
