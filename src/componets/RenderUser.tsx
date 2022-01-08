import React from "react";
import { User } from "../utils/models";

interface Props {
  me: User;
  small?: boolean;
}
export default function RenderUser({ me, small }: Props) {
  // todo logout page
  if (small)
    return (
      <div className="flex items-center justify-between text-white">
        <div className="mr-4">
          <div className="font-bold">{me.display_name}</div>
        </div>
        <div className="relative rounded-full object-cover object-center h-8 w-8 flex items-center justify-center overflow-hidden">
          <img src={me.image} alt="User profile" className="absolute inset-0 object-cover object-center" />
        </div>
      </div>
    );
  return (
    <div className="bg-gray-600 rounded-full p-2 flex items-center">
      <div className="relative rounded-full object-cover object-center border-4 border-white h-16 w-16 flex items-center justify-center overflow-hidden">
        <img src={me.image} alt="User profile" className="absolute inset-0 object-cover object-center" />
      </div>
      <div className="mx-4">
        <div className="tracking-widest font-bold text-xs opacity-75">{me.id}</div>
        <div className="text-xl font-bold">{me.display_name}</div>
      </div>
    </div>
  );
}
