"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./SignInCard";
import SignOutCard from "./SignUpCard";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      {/* 这里少加一个md:h-auto TODO */}
      <div className="md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignOutCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
