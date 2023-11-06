"use client";

import React, { useEffect } from "react";
import RainbowTitle from "./ui/rainbow-title";
import Glass from "./ui/glassmorphism";
import { Input } from "./ui/input";
import Pagination from "./pagination";
import { Button } from "./ui/button";
import Image from "next/image";

function DatasetInput({
  selectedData,
  submitData,
  handleChangeMultiple,
}: {
  selectedData: File[];
  submitData: any;
  handleChangeMultiple: any;
}) {
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

  let data =
    selectedData.length > 3 ? selectedData.slice(start, end) : selectedData;

  useEffect(() => {
    data = selectedData.slice(start, end);
  }, []);

  return (
    <div className='w-[80%]'>
      <RainbowTitle title='Dataset Input' />
      <Glass className='space-y-4'>
        <div className='flex'>
          <form className='flex' onSubmit={submitData}>
            <Input
              type='file'
              placeholder='Username'
              multiple
              onChange={handleChangeMultiple}
            />
            <Button
              type='submit'
              className='hover:bg-gradient-to-l from-orange-400 to-purple-500 transition-colors duration-500'
            >
              Submit
            </Button>
          </form>
        </div>

        <div className='h-[300px]'>
          {selectedData.length > 0 ? (
            <div className='grid grid-cols-3 h-full gap-4'>
              {data.map((file, idx) => (
                <div className='aspect-square relative' key={idx}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt=''
                    className='object-contain rounded-lg w-fit h-fit'
                    fill
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <p className='text-center font-semibold text-[24px]'>
                No selected data-set
              </p>
            </div>
          )}
        </div>

        <Pagination
          handleClick={handleClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          length={selectedData.length}
          currentPage={currentPage}
        />
      </Glass>
    </div>
  );
}

export default DatasetInput;
