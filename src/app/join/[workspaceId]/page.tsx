"use client";

import Image from "next/image";

import VerificationInput from "react-verification-input";

const JoinPage = () => {
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <Image src="vercel.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">加入工作空间</h1>
          <p className="text-sm text-muted-foreground">请输入工作空间邀请码</p>
        </div>
        <VerificationInput
          length={6}
          autoFocus
          classNames={{
            container: "flex gap-x-2",
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "text-black bg-white",
            characterFilled: "text-black bg-white",
          }}
        />
      </div>
    </div>
  );
};

export default JoinPage;
