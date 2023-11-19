import React, { useEffect } from "react";
import Image from "next/image";
import { JsonData } from "./result";
import Pagination from "./pagination";
import { time } from "console";

function RenderResult({ data }: { data: JsonData }) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.textContent));
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const start = (currentPage - 1) * 3;
  const end = start + 3;
  const length = data.data.length;

  let slicedData = length > 3 ? data.data.slice(start, end) : data.data;

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    }

    if (currentPage > Math.ceil(length / 3) && length > 0) {
      setCurrentPage(Math.ceil(length / 3));
    }
  }, []);

  return (
    <>
      <div className='h-[300px]'>
        {data.time > 0 && data.data.length > 0 ? (
          <div className='grid grid-cols-3 min-h-[300px] h-auto gap-6'>
            {slicedData.map((file, idx) => (
              <div className='flex flex-col w-full h-full' key={idx}>
                <div className='aspect-square relative'>
                  <Image
                    src={file.url}
                    alt=''
                    className='object-contain rounded-xl w-fit h-fit'
                    fill
                  />
                  <div className='absolute bottom-0 w-full p-2 rounded-xl bg-white text-center font-semibold'>
                    {file.percentage.toFixed(2)}
                    {"%"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-center font-semibold text-[24px]'>
            No Result
          </div>
        )}
      </div>

      <Pagination
        handleClick={handleClick}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        length={length}
        currentPage={currentPage}
      />
    </>
  );
}

export default RenderResult;
