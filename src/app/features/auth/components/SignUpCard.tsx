"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("两次密码不一致！");
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => setError("异常错误，请重试！"))
      .finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>注册</CardTitle>
        <CardDescription>使用邮箱或其它方式注册</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="px-0 pt-0 space-y-5">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
          <Input
            placeholder="姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={false}
          />
          <Input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={false}
          />
          <Input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={false}
          />
          <Input
            type="password"
            placeholder="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={false}
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            注册
          </Button>
        </form>
        <Separator />
        <div className="w-full flex flex-col space-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignUp("google")}
            disabled={false}
          >
            <FcGoogle className="size-5 left-5 absolute" />
            谷歌登陆
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignUp("github")}
            disabled={false}
          >
            <FaGithub className="size-5 left-5 absolute" />
            Github登陆
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          已经拥有账号？
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            登陆
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
