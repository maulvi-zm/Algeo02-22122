"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function DatasetInput() {
  const [selectedData, setSelectedData] = React.useState<File[]>([]);

  function handleChangeMultiple(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (e.target.files) {
      setSelectedData(Array.from(e.target.files));
    }
  }

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    selectedData.forEach((file) => {
      formData.append("file_uploads", file);
    });

    try {
      const endPoint = "http://localhost:8000/uploaddata/"; //isi sesuai endpoint back end
      const res = await fetch(endPoint, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.log("Upload error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='w-full rounded-lg  flex-1 flex gap-3 items-center h-[300px] overflow-scroll mb-10 justify-between'>
        {selectedData.length > 0 ? (
          selectedData.map((file, idx) => (
            <div className='w-[30%] aspect-square relative' key={idx}>
              <Image
                src={URL.createObjectURL(file)}
                alt=''
                className='object-contain rounded-lg w-fit h-fit'
                fill
              />
            </div>
          ))
        ) : (
          <div className='w-full flex items-center justify-center'>
            <p className='text-center font-semibold text-[24px]'>
              No selected data-set
            </p>
          </div>
        )}
      </div>

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
    </>
  );
}

export default DatasetInput;
