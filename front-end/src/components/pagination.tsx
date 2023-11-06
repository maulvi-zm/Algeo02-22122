import React from "react";
import { Button } from "./ui/button";
import { ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

function Pagination({
  handleClick,
  handlePrevClick,
  handleNextClick,
  length,
  currentPage,
}: {
  handleClick: any;
  handlePrevClick: any;
  handleNextClick: any;
  length: number;
  currentPage: number;
}) {
  const totalSelectedData: number = length;
  const dataPerPage: number = 3;
  const totalPage: number = Math.ceil(totalSelectedData / dataPerPage);

  let pageNumbers: number[] = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i <= 0) continue;
    if (i > totalPage) break;
    pageNumbers.push(i);
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='flex gap-4 bg-white rounded-xl justify-center p-2'>
        {currentPage >= 2 && (
          <Button onClick={handlePrevClick} variant='ghost'>
            <ChevronsLeft />
          </Button>
        )}
        {pageNumbers.map((number, idx) => (
          <Button
            variant='ghost'
            onClick={handleClick}
            key={idx}
            className={`${number == currentPage && "font-bold text-[24px]"}`}
          >
            {number}
          </Button>
        ))}
        {currentPage < totalPage && currentPage != 0 && (
          <Button onClick={handleNextClick} variant='ghost'>
            <ChevronsRight />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
