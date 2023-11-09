"use client";

import Glass from "@/components/ui/glassmorphism";
import CameraVid from "./camera";
import DatasetInput from "@/components/dataset-input";
import React from "react";
import Results, { JsonData } from "@/components/result";

function Camera() {
  const [selectedData, setSelectedData] = React.useState<File[]>([]);

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
  };
  return (
    <>
      <div className='z-10 min-w-[80%] w-auto'>
        <Glass>
          <CameraVid />
        </Glass>
      </div>

      <DatasetInput
        selectedData={selectedData}
        submitData={submitData}
        handleChangeMultiple={handleChangeMultiple}
      />

      <Results />
    </>
  );
}

export default Camera;
