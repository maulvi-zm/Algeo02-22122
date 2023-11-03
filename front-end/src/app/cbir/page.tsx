import Glass from "@/components/ui/glassmorphism";
import React from "react";
import ImageInput from "./image-input";
import DatasetInput from "./dataset-input";
import RainbowTitle from "@/components/ui/rainbow-title";

function CBIR() {
  return (
    <>
      <div className='w-[80%]'>
        <RainbowTitle title='Image Input' />
        <Glass className='w-full flex justify-between'>
          <ImageInput />
        </Glass>
      </div>

      <div className='w-[80%]'>
        <RainbowTitle title='Dataset Input' />
        <Glass>
          <DatasetInput />
        </Glass>
      </div>
    </>
  );
}

export default CBIR;
