"use client";

import React, { useEffect, useRef, useState } from "react";
import RainbowTitle from "./ui/rainbow-title";
import Glass from "./ui/glassmorphism";
import { Input } from "./ui/input";
import Pagination from "./pagination";
import { Button } from "./ui/button";
import Image from "next/image";
import { Tabs, TabsTrigger } from "./ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";

interface ImageData {
  url: string;
}

interface ScrapData {
  data: ImageData[];
}

const initialData: ScrapData = {
  data: [],
};

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
  const [linkScrap, setLinkScrap] = useState("");
  const [dataScrap, setaDataScrap] = useState<ScrapData>(initialData);
  const inputFolder = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.textContent));
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const linkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkScrap(e.target.value);
  };

  const submitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const formData = new FormData();

    formData.append("link", linkScrap as string);

    try {
      const endPoint = "http://localhost:8000/scrape"; //isi sesuai endpoint back end
      const res = await fetch(endPoint, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setaDataScrap(data);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const start = (currentPage - 1) * 3;
  const end = start + 3;

  let data =
    selectedData.length > 3 ? selectedData.slice(start, end) : selectedData;

  let scrap =
    dataScrap.data.length > 3
      ? dataScrap.data.slice(start, end)
      : dataScrap.data;

  useEffect(() => {
    data = selectedData.slice(start, end);
    scrap =
      dataScrap.data.length > 3
        ? dataScrap.data.slice(start, end)
        : dataScrap.data;
  }, []);

  return (
    <div className='w-[80%]'>
      <RainbowTitle title='Dataset Input' />
      <Glass className='space-y-4'>
        <Tabs className='w-full' defaultValue='user-input'>
          <TabsList className='grid grid-cols-2 w-full p-2 bg-slate-700/10 rounded-lg mb-4'>
            <TabsTrigger value='user-input'>User Input</TabsTrigger>
            <TabsTrigger value='image-scrap'>Image Scrap</TabsTrigger>
          </TabsList>
          <TabsContent value='user-input' className='flex flex-col gap-4'>
            <div className='flex'>
              <form className='flex gap-2' onSubmit={submitData}>
                <Input
                  type='file'
                  placeholder='Username'
                  multiple
                  onChange={handleChangeMultiple}
                  ref={(node) => {
                    inputFolder.current = node;

                    if (node) {
                      ["webkitdirectory", "directory", "mozdirectory"].forEach(
                        (attr) => {
                          node.setAttribute(attr, "");
                        }
                      );
                    }
                  }}
                  accept='image/*'
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
          </TabsContent>
          <TabsContent value='image-scrap' className='flex flex-col gap-10'>
            <div className='flex'>
              <form className='flex gap-2' onSubmit={submitLink}>
                <Input
                  type='text'
                  placeholder='Link to scrap Image'
                  onChange={linkChange}
                  className='w-[330px]'
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
              {dataScrap.data.length > 0 ? (
                <div className='grid grid-cols-3 h-full gap-4'>
                  {scrap.map((file, idx) => (
                    <div className='aspect-square relative' key={idx}>
                      <Image
                        src={file.url}
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
              length={dataScrap.data.length}
              currentPage={currentPage}
            />
          </TabsContent>
        </Tabs>
      </Glass>
    </div>
  );
}

export default DatasetInput;
