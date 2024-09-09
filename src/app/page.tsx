"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import UserButton from "./features/auth/components/UserButton";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      已登录
      <UserButton />
      <Button onClick={() => signOut()}>退出</Button>
    </main>
  );
}
