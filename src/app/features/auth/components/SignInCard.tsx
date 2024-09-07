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
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>登录</CardTitle>
        <CardDescription>使用邮箱或其它方式登录</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pt-0 space-y-5">
        <form className="space-y-2.5">
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
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            登录
          </Button>
        </form>
        <Separator />
        <div className="w-full flex flex-col space-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {}}
            disabled={false}
          >
            <FcGoogle className="size-5 left-5 absolute" />
            谷歌登陆
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {}}
            disabled={false}
          >
            <FaGithub className="size-5 left-5 absolute" />
            Github登陆
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          还没有账号？
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            注册
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
