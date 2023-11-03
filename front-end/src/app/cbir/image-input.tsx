"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function ImageInput() {
  const [file, setFile] = React.useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file_upload", file as File);

    try {
      const endPoint = "http://localhost:8000/uploadfile/"; //isi sesuai endpoint back end
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
      <div className='h-full w-[50%] place-self-center rounded-lg'>
        <div className='w-full aspect-square relative rounded-2xl overflow-clip flex items-center justify-center'>
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt=''
              className='rounded-xl w-fit h-fit object-contain'
              fill
            />
          ) : (
            <p className='text-center font-semibold text-[24px]'>
              No selected file
            </p>
          )}
        </div>
      </div>

      <div className='bg-white h-fit p-10 rounded-xl flex flex-col gap-10 place-self-center w-[40%] '>
        <form className='flex' onSubmit={handleSubmit}>
          <Input
            type='file'
            placeholder='Username'
            onChange={handleChange}
            className='z-10'
          />
          <Button
            type='submit'
            className='hover:bg-gradient-to-r from-orange-400 to-purple-500 transition-colors duration-500'
          >
            Submit
          </Button>
        </form>
        <div className='flex justify-center'>
          <p>Color</p>
          <Switch />
          <p>Texture</p>
        </div>
      </div>
    </>
  );
}

export default ImageInput;
