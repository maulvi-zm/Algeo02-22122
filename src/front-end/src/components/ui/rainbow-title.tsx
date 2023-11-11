import React from "react";

function RainbowTitle({
  title,
  reversed = false,
}: {
  title: string;
  reversed?: boolean;
}) {
  return (
    <div
      className={`py-[12px] px-4 bg-white w-fit mb-10 rounded-lg flex items-center gap-2 
        ${reversed ? "flex-row-reverse" : ""}`}
    >
      <div className='w-[10px] h-[10px] rounded-full bg-red-500'></div>
      <div className='w-[10px] h-[10px] rounded-full bg-yellow-500'></div>
      <div className='w-[10px] h-[10px] rounded-full bg-green-500'></div>
      <p className='font-medium text-xl'>{title}</p>
    </div>
  );
}

export default RainbowTitle;
