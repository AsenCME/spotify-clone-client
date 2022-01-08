import React from "react";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}
export default function Button({ onClick, children }: Props) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 rounded-full w-full flex items-center justify-center bg-gray-600 cursor-pointer transition-all hover:ring-2 hover:ring-white"
    >
      {children}
    </div>
  );
}
