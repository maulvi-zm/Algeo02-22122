"use client";

import Glass from "@/components/ui/glassmorphism";
import React, { use, useEffect } from "react";
import ImageInput from "./image-input";
import DatasetInput from "@/components/dataset-input";
import RainbowTitle from "@/components/ui/rainbow-title";
import Result from "./result";

interface ImageData {
  url: string;
  percentage: number;
}

interface JsonData {
  data: ImageData[];
  time: number;
}

const initialData: JsonData = {
  data: [],
  time: 0,
};

function CBIR() {
  const [file, setFile] = React.useState<File | null>(null);
  const [selectedData, setSelectedData] = React.useState<File[]>([]);
  const [resultData, setResultData] = React.useState<JsonData>(initialData);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-result"); // Ganti URL dengan URL yang sesuai
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      setResultData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    fetchData();
  };

  function handleChangeMultiple(e: React.ChangeEvent<HTMLInputElement>) {
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

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='w-[80%]'>
        <RainbowTitle title='Image Input' />
        <Glass className='w-full flex justify-between'>
          <ImageInput
            file={file}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Glass>
      </div>

      <DatasetInput
        selectedData={selectedData}
        submitData={submitData}
        handleChangeMultiple={handleChangeMultiple}
      />

      <div className='w-[80%]'>
        <div className='w-full flex justify-between'>
          <RainbowTitle title='Result' />
          <RainbowTitle
            title={`${resultData.data.length} result in ${resultData.time}`}
          />
        </div>
        <Glass>
          <Result data={resultData} />
        </Glass>
      </div>
    </>
  );
}

export default CBIR;
