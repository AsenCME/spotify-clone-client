import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Fullscreen({ children }: Props) {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-4 text-white">
      {children}
    </div>
  );
}
