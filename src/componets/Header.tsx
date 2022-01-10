import React from "react";
import { navigate } from "@reach/router";

import useMe from "../utils/hooks/useMe";
import RenderUser from "./RenderUser";

export default function Header() {
  const { me, isLoading } = useMe();
  return (
    <div className="bg-gray-600 px-4 py-2 flex items-center justify-between">
      <div
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => {
          navigate("/home");
        }}
      >
        Dashboard
      </div>
      {isLoading ? "Loading..." : !me ? "Could not get user :(" : <RenderUser small me={me} />}
    </div>
  );
}
