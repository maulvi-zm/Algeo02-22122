"use client";

import { Switch } from "./ui/switch";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";

function CBIR() {
  const [file, setFile] = React.useState<File | null>(null);
  const [selectedData, setSelectedData] = React.useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function handleChangeMultiple(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (e.target.files) {
      setSelectedData(Array.from(e.target.files));
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

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    selectedData.forEach((file) => {
      formData.append("file_uploads", file);
    });

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
      <p>TUBES ALGEO</p>
      <div className='w-full grid grid-cols-2 h-[500px] items-center justify-center'>
        <div className='object-fit h-[80%] aspect-square place-self-center ring-4 ring-offset-2 rounded-lg ring-black'>
          <div className='w-full aspect-square relative rounded-2xl overflow-clip flex items-center justify-center'>
            {file ? (
              <Image src={URL.createObjectURL(file)} alt='' className='' fill />
            ) : (
              <p className='text-center'>No selected file</p>
            )}
          </div>
        </div>
        <div>
          <form className='flex' onSubmit={handleSubmit}>
            <Input
              type='file'
              placeholder='Username'
              onChange={handleChange}
              className='z-10'
            />
            <Button type='submit'>Submit</Button>
          </form>
          <div className='flex justify-center'>
            <p>Color</p>
            <Switch />
            <p>Texture</p>
          </div>
        </div>
      </div>

      <div className='w-full rounded-lg ring-offset-2 flex-1 flex gap-3 items-center min-h-[200px] my-10 overflow-scroll ring-4 ring-black'>
        {selectedData.length > 0 ? (
          selectedData.map((file, idx) => (
            <div
              className='w-[30%] min-w-[30%] max-w-[30%] aspect-square relative'
              key={idx}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt=''
                className='w-full aspect-square object-contain rounded-lg'
                fill
              />
            </div>
          ))
        ) : (
          <div className='w-full flex items-center justify-center'>
            <p className='text-center'>No selected data-set</p>
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
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </>
  );
}

export default CBIR;
