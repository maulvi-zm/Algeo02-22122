import { cn } from "@/lib/utils";
import React from "react";

function Glass({
  className = "",
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "h-auto w-full bg-white/40 rounded-xl backdrop-blur-[50px] shadow-2xl  shadow-black/20 z-10 p-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Glass;
