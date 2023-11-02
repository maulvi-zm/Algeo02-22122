"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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
      <div className='w-full grid grid-cols-2 h-[500px] items-center justify-center min-h-[500px] bg-white/40 rounded-xl backdrop-blur-[100px] shadow-2xl  shadow-black/20 z-10 flex-row p-10'>
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

      <div className='absolute top-0 mx-auto rotate-0 z-0'>
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1000'
          viewBox='0 0 1357 1481'
          fill='none'
        >
          <g filter='url(#filter0_f_16_2152)'>
            <path
              d='M572.425 859.42C386.859 818.377 193.585 1176.25 120.143 1360.32L244.926 130.821C313.791 257.534 805.333 119.905 972.409 120.15C1139.49 120.396 1188.28 330.936 1230.11 413.556C1271.94 496.176 1097.44 586.725 990.342 667.797C883.241 748.869 804.382 910.724 572.425 859.42Z'
              fill='url(#paint0_linear_16_2152)'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_16_2152'
              x='0.143066'
              y='0.149902'
              width='1356.32'
              height='1480.17'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'
            >
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='60'
                result='effect1_foregroundBlur_16_2152'
              />
            </filter>
            <linearGradient
              id='paint0_linear_16_2152'
              x1='148.28'
              y1='1128.13'
              x2='1380.57'
              y2='261.317'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#D62828' stop-opacity='0.56' />
              <stop
                offset='0.416667'
                stop-color='#FF70E8'
                stop-opacity='0.390625'
              />
              <stop offset='1' stop-color='#143ED6' stop-opacity='0' />
            </linearGradient>
          </defs>
        </svg> */}

        <svg
          width='1124'
          height='1077'
          viewBox='0 0 1124 1077'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.8' filter='url(#filter0_f_105_3)'>
            <circle
              cx='561.998'
              cy='514.998'
              r='361.528'
              transform='rotate(-17.3762 561.998 514.998)'
              fill='url(#paint0_linear_105_3)'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_105_3'
              x='0.373047'
              y='-46.627'
              width='1123.25'
              height='1123.25'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='100'
                result='effect1_foregroundBlur_105_3'
              />
            </filter>
            <linearGradient
              id='paint0_linear_105_3'
              x1='561.998'
              y1='153.47'
              x2='561.998'
              y2='876.525'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#00C2FF' stopOpacity='0' />
              <stop offset='1' stopColor='#FF29C3' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

export default CBIR;
