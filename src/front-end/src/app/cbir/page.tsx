"use client";

import Glass from "@/components/ui/glassmorphism";
import React from "react";
import ImageInput from "./image-input";
import DatasetInput from "@/components/dataset-input";
import RainbowTitle from "@/components/ui/rainbow-title";
import Results from "@/components/result";
import { useToast } from "@/components/ui/use-toast";

function CBIR() {
  const [file, setFile] = React.useState<File | null>(null);
  const [selectedData, setSelectedData] = React.useState<File[]>([]);
  const { toast } = useToast();

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
        toast({
          title: "File Submitted Successfully!",
          description: "Please continue to submit the data set.",
          variant: "success",
        });
      } else {
        toast({
          title: "Something Went Wrong!",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something Went Wrong!",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  function handleChangeMultiple(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSelectedData(Array.from(e.target.files));
    }
  }

  function handleInputType() {
    for (let i = 0; i < selectedData.length; i++) {
      const file = selectedData[i];

      if (!file.type.startsWith("image/") && file.name != ".DS_Store") {
        return false;
      }
    }

    return true;
  }

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleInputType()) {
      toast({
        title: "Invalid File Type!",
        description: "Please upload only images.",
        variant: "destructive",
      });
    } else {
      const formData = new FormData();

      selectedData.forEach((file) => {
        formData.append("file_uploads", file);
      });

      console.log(selectedData);

      try {
        const endPoint = "http://localhost:8000/uploaddata/"; //isi sesuai endpoint back end
        const res = await fetch(endPoint, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          toast({
            title: "File Submitted Successfully!",
            description: "Please continue to next section to see the results",
            variant: "success",
          });
        } else {
          toast({
            title: "Something Went Wrong!",
            description: "Please try again later",
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Something Went Wrong!",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    }
  };

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

      <Results />
    </>
  );
}

export default CBIR;
