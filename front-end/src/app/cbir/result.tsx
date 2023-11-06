"use client";

import React from "react";
import Image from "next/image";

interface ImageData {
  url: string;
  percentage: number;
}

interface JsonData {
  data: ImageData[];
  time: number;
}

function Results({ data }: { data: JsonData }) {
  return (
    <>
      <div className='w-full rounded-lg  flex-1 flex gap-3 items-center h-[300px] overflow-scroll mb-10 justify-between'>
        {data.data.length > 0 ? (
          data.data.map((file, idx) => (
            <div className='flex flex-col w-[30%]'>
              <div className='w-full aspect-square relative' key={idx}>
                <Image
                  src={file.url}
                  alt=''
                  className='object-contain rounded-lg w-fit h-fit'
                  fill
                />
              </div>
              <div className='w-full p-2 rounded-b-xl bg-white text-center font-semibold'>
                {file.percentage.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className='w-full flex items-center justify-center'>
            <p className='text-center font-semibold text-[24px]'>
              No result yet
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Results;
