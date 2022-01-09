import React from "react";

interface Props {
  active?: boolean;
  margin?: { t?: number; l?: number; b?: number; r?: number };
  color?: "light" | "dark";
  onClick: () => void;
  children: React.ReactNode;
}
export default function IconButton({ active, margin, color = "light", onClick, children }: Props) {
  if (color === "light")
    return (
      <div
        className="relative flex-none transition-all hover:scale-110 cursor-pointer text-gray-300 hover:text-white"
        style={{ marginLeft: margin?.l, marginRight: margin?.r, marginTop: margin?.t, marginBottom: margin?.b }}
        onClick={onClick}
      >
        {active && <div className="absolute w-2 h-2 rounded-full bg-white -top-1 -right-1"></div>}
        {children}
      </div>
    );
  return (
    <div
      className="relative flex-none transition-all hover:scale-110 cursor-pointer text-gray-600 hover:text-black"
      style={{ marginLeft: margin?.l, marginRight: margin?.r, marginTop: margin?.t, marginBottom: margin?.b }}
      onClick={onClick}
    >
      {active && <div className="absolute w-2 h-2 rounded-full bg-black -top-1 -right-1"></div>}
      {children}
    </div>
  );
}
